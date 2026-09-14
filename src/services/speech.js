// Speech Recognition & Real-Time Audio Metrics Service

import { FILLER_WORDS } from '../config/constants';

export class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.transcriptSegments = [];
    this.fullText = '';
    this.onTranscriptCallback = null;
    this.onErrorCallback = null;
    
    // Metrics tracking
    this.startTime = null;
    this.wordCount = 0;
    this.fillerCounts = {};
    FILLER_WORDS.forEach(word => { this.fillerCounts[word] = 0; });
    this.pauses = [];
    this.lastSpeechTime = null;
    this.repeatedPhrases = [];
  }

  isSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  init(onTranscript, onError) {
    this.onTranscriptCallback = onTranscript;
    this.onErrorCallback = onError;

    if (!this.isSupported()) {
      console.warn('Web Speech API not supported in this browser. Demo simulation mode active.');
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      const now = Date.now();
      if (this.lastSpeechTime && (now - this.lastSpeechTime) > 2000) {
        // Detected a pause greater than 2 seconds
        this.pauses.push({
          timestamp: (now - this.startTime) / 1000,
          duration: (now - this.lastSpeechTime) / 1000
        });
      }
      this.lastSpeechTime = now;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcriptChunk + ' ';
          this.processTextChunk(transcriptChunk);
        } else {
          interim += transcriptChunk;
        }
      }

      if (final) {
        this.fullText += final;
        this.transcriptSegments.push({
          text: final.trim(),
          timestamp: Math.floor((now - (this.startTime || now)) / 1000),
          isFinal: true
        });
      }

      if (this.onTranscriptCallback) {
        this.onTranscriptCallback({
          fullText: this.fullText + interim,
          interimText: interim,
          segments: this.transcriptSegments,
          metrics: this.getMetrics()
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (this.onErrorCallback) {
        this.onErrorCallback(event.error);
      }
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        // Automatically restart if still active session
        try {
          this.recognition.start();
        } catch (e) {
          // ignore restart error
        }
      }
    };

    return true;
  }

  start() {
    this.isListening = true;
    this.startTime = Date.now();
    this.lastSpeechTime = Date.now();
    this.fullText = '';
    this.transcriptSegments = [];
    this.wordCount = 0;
    this.pauses = [];
    FILLER_WORDS.forEach(word => { this.fillerCounts[word] = 0; });

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (err) {
        console.warn('Recognition start exception:', err);
      }
    }
  }

  stop() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore
      }
    }
  }

  processTextChunk(text) {
    const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const words = cleanText.split(/\s+/).filter(Boolean);
    this.wordCount += words.length;

    // Check filler words
    FILLER_WORDS.forEach(filler => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) {
        this.fillerCounts[filler] = (this.fillerCounts[filler] || 0) + matches.length;
      }
    });

    // Check repetition
    if (words.length >= 3) {
      for (let i = 0; i < words.length - 2; i++) {
        const phrase = `${words[i]} ${words[i+1]} ${words[i+2]}`;
        if (this.fullText.toLowerCase().split(phrase).length - 1 > 2) {
          if (!this.repeatedPhrases.includes(phrase)) {
            this.repeatedPhrases.push(phrase);
          }
        }
      }
    }
  }

  getMetrics() {
    const elapsedSeconds = this.startTime ? (Date.now() - this.startTime) / 1000 : 1;
    const elapsedMinutes = Math.max(elapsedSeconds / 60, 0.05);
    const wpm = Math.round(this.wordCount / elapsedMinutes);

    const totalFillers = Object.values(this.fillerCounts).reduce((a, b) => a + b, 0);

    // Calculate attention risk score (0 - 100, lower is better)
    let attentionRiskScore = 15;
    if (wpm > 175 || wpm < 100) attentionRiskScore += 25;
    if (totalFillers > 5) attentionRiskScore += 20;
    if (this.pauses.length > 4) attentionRiskScore += 15;
    if (elapsedSeconds > 45 && this.wordCount < 40) attentionRiskScore += 25;

    let attentionRiskLevel = 'Low';
    if (attentionRiskScore >= 60) attentionRiskLevel = 'High';
    else if (attentionRiskScore >= 35) attentionRiskLevel = 'Medium';

    return {
      wpm,
      wordCount: this.wordCount,
      totalFillers,
      fillerCounts: { ...this.fillerCounts },
      pauseCount: this.pauses.length,
      pauses: [...this.pauses],
      attentionRiskLevel,
      attentionRiskScore,
      elapsedSeconds: Math.floor(elapsedSeconds)
    };
  }
}

export const speechService = new SpeechService();
