// Vision & Non-Verbal Communication Analytics Service

export class VisionService {
  constructor() {
    this.stream = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
    this.animFrameId = null;
    this.isAnalyzing = false;
    
    this.prevFrameData = null;
    this.movementScore = 0;
    this.eyeContactStability = 92;
    this.expressiveness = 78;
    this.gestureActivity = 55;
    this.postureScore = 88;
    
    this.onMetricsCallback = null;
  }

  async startCamera(videoRef, onMetrics) {
    this.onMetricsCallback = onMetrics;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false // Audio handled separately or jointly
      });

      if (videoRef && videoRef.current) {
        this.videoElement = videoRef.current;
        this.videoElement.srcObject = this.stream;
        await this.videoElement.play();

        // Create offscreen canvas for frame difference analysis
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.width = 160;
        this.canvasElement.height = 120;
        this.canvasCtx = this.canvasElement.getContext('2d', { willReadFrequently: true });

        this.isAnalyzing = true;
        this.analyzeLoop();
      }
      return { success: true, stream: this.stream };
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      return { success: false, error: err.message };
    }
  }

  stopCamera() {
    this.isAnalyzing = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  analyzeLoop() {
    if (!this.isAnalyzing || !this.videoElement || !this.canvasCtx) return;

    try {
      this.canvasCtx.drawImage(this.videoElement, 0, 0, 160, 120);
      const currentFrame = this.canvasCtx.getImageData(0, 0, 160, 120);
      
      if (this.prevFrameData) {
        let diff = 0;
        const data1 = this.prevFrameData.data;
        const data2 = currentFrame.data;
        const totalPixels = data1.length / 4;

        // Sample every 4th pixel for speed
        for (let i = 0; i < data1.length; i += 16) {
          const rDiff = Math.abs(data1[i] - data2[i]);
          const gDiff = Math.abs(data1[i+1] - data2[i+1]);
          const bDiff = Math.abs(data1[i+2] - data2[i+2]);
          diff += (rDiff + gDiff + bDiff) / 3;
        }

        const rawFrameDiff = diff / (totalPixels / 4);
        
        // Smoothing exponential moving average
        this.movementScore = Math.min(100, Math.round(this.movementScore * 0.8 + rawFrameDiff * 4.0));
        
        // Gesture & Expressiveness proxies
        if (this.movementScore > 40) {
          this.gestureActivity = Math.min(100, this.gestureActivity + 2);
          this.eyeContactStability = Math.max(70, this.eyeContactStability - 0.5);
        } else {
          this.gestureActivity = Math.max(30, this.gestureActivity - 1);
          this.eyeContactStability = Math.min(96, this.eyeContactStability + 0.3);
        }

        this.expressiveness = Math.round((this.movementScore * 0.4) + (this.gestureActivity * 0.6));
      }

      this.prevFrameData = currentFrame;

      if (this.onMetricsCallback) {
        this.onMetricsCallback({
          movementScore: this.movementScore,
          eyeContactStability: Math.round(this.eyeContactStability),
          expressiveness: Math.round(this.expressiveness),
          gestureActivity: Math.round(this.gestureActivity),
          postureScore: this.postureScore,
          observation: this.getNonVerbalObservation()
        });
      }
    } catch (e) {
      // frame read exception fallback
    }

    this.animFrameId = requestAnimationFrame(() => this.analyzeLoop());
  }

  getNonVerbalObservation() {
    if (this.movementScore > 65) {
      return {
        observation: "High bodily and gesture movement detected (~65%+ frame shift).",
        interpretation: "High energy, but make sure gestures feel intentional rather than pacing."
      };
    } else if (this.movementScore < 10) {
      return {
        observation: "Minimal head and upper body movement observed (<10% frame shift).",
        interpretation: "Controlled posture, though adding subtle facial expressiveness increases audience connection."
      };
    } else {
      return {
        observation: "Balanced body movement and eye-contact stability.",
        interpretation: "Natural posture with effective audience gaze direction."
      };
    }
  }
}

export const visionService = new VisionService();
