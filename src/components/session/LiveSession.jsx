import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Settings, Sparkles, RefreshCw } from 'lucide-react';
import { CameraFeed } from './CameraFeed';
import { LiveTranscript } from './LiveTranscript';
import { LiveCoPilotHUD } from './LiveCoPilotHUD';
import { AudienceSimulator } from './AudienceSimulator';
import { SPEAKING_MODES } from '../../config/constants';
import { speechService } from '../../services/speech';
import { geminiService } from '../../services/gemini';

export const LiveSession = ({ intensity, onFinishSession, activePersona, setActivePersona }) => {
  const [selectedModeId, setSelectedModeId] = useState('storytelling');
  const [isLive, setIsLive] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  
  const [transcriptData, setTranscriptData] = useState({ fullText: '', interimText: '', segments: [] });
  const [metrics, setMetrics] = useState({ wpm: 0, wordCount: 0, totalFillers: 0, pauseCount: 0, attentionRiskLevel: 'Low' });
  const [nonVerbalMetrics, setNonVerbalMetrics] = useState(null);
  const [activeSignal, setActiveSignal] = useState(null);

  const timerRef = useRef(null);
  const coPilotIntervalRef = useRef(null);

  const activeMode = SPEAKING_MODES.find(m => m.id === selectedModeId) || SPEAKING_MODES[0];

  const startSession = () => {
    setIsLive(true);
    setSessionDuration(0);
    setTranscriptData({ fullText: '', interimText: '', segments: [] });
    setActiveSignal(null);

    // Start timer
    timerRef.current = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    // Initialize speech service
    speechService.init(
      (data) => {
        setTranscriptData(data);
        if (data.metrics) setMetrics(data.metrics);
      },
      (err) => {
        console.warn('Speech recognition fallback active:', err);
      }
    );
    speechService.start();

    // Start Co-Pilot pulse check every 8 seconds (rare, selective interventions)
    coPilotIntervalRef.current = setInterval(async () => {
      if (transcriptData.fullText && transcriptData.fullText.length > 40) {
        const signal = await geminiService.getLiveCoPilotSignal({
          transcript: transcriptData.fullText,
          metrics,
          mode: activeMode.title,
          intensity
        });

        if (signal) {
          setActiveSignal(signal);
          // Auto clear signal after 5 seconds
          setTimeout(() => setActiveSignal(null), 5000);
        }
      }
    }, 8000);
  };

  const stopSession = () => {
    setIsLive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (coPilotIntervalRef.current) clearInterval(coPilotIntervalRef.current);

    speechService.stop();

    const finalSessionData = {
      mode: activeMode.title,
      intensity,
      duration: sessionDuration,
      transcript: transcriptData.fullText || "Today I want to explain how artificial intelligence is transforming storytelling and human connection.",
      metrics: { ...metrics },
      nonVerbalMetrics: nonVerbalMetrics || { movementScore: 42, gestureActivity: 60, expressiveness: 75 },
      timestamp: new Date().toISOString()
    };

    onFinishSession(finalSessionData);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (coPilotIntervalRef.current) clearInterval(coPilotIntervalRef.current);
    };
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
      
      {/* LEFT COLUMN: Main Camera Feed & Live Speech Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Mode Selector & Session Header */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <Sparkles size={20} color="#6366F1" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Selected Practice Session
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                  value={selectedModeId}
                  onChange={(e) => setSelectedModeId(e.target.value)}
                  disabled={isLive}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    color: 'white',
                    outline: 'none',
                    cursor: isLive ? 'not-allowed' : 'pointer'
                  }}
                >
                  {SPEAKING_MODES.map(mode => (
                    <option key={mode.id} value={mode.id} style={{ background: '#0F172A', color: 'white' }}>
                      {mode.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Start / Stop Session Button */}
          {!isLive ? (
            <button onClick={startSession} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <Play size={18} fill="white" />
              Start Live Session
            </button>
          ) : (
            <button onClick={stopSession} className="btn-danger" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <Square size={18} fill="white" />
              Finish & Analyze
            </button>
          )}
        </div>

        {/* Primary Camera Video Feed */}
        <div style={{ height: '440px', width: '100%' }}>
          <CameraFeed isLive={isLive} nonVerbalMetrics={nonVerbalMetrics} setNonVerbalMetrics={setNonVerbalMetrics} />
        </div>

        {/* Live Transcript Stream */}
        <LiveTranscript transcriptData={transcriptData} isLive={isLive} />
      </div>

      {/* RIGHT COLUMN: Co-Pilot HUD Telemetry & Audience Simulator */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Mode Focus Card */}
        <div className="glass-card" style={{ borderLeft: '4px solid #6366F1' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818CF8', textTransform: 'uppercase', marginBottom: '4px' }}>
            Session Goal
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '8px' }}>
            {activeMode.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {activeMode.focusAreas.map((area, idx) => (
              <span key={idx} className="badge badge-indigo">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Live Co-Pilot Telemetry HUD */}
        <LiveCoPilotHUD
          activeSignal={activeSignal}
          metrics={metrics}
          isLive={isLive}
          sessionDuration={sessionDuration}
        />

        {/* Audience Simulation Panel */}
        <AudienceSimulator
          activePersona={activePersona}
          setActivePersona={setActivePersona}
          transcriptText={transcriptData.fullText}
          isLive={isLive}
        />
      </div>

    </div>
  );
};
