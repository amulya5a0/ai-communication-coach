import React, { useState, useEffect } from 'react';
import { Zap, Clock, RefreshCw, Play, CheckCircle, Sparkles } from 'lucide-react';
import { geminiService } from '../../services/gemini';

export const ThinkingOnFeet = () => {
  const [promptData, setPromptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const fetchNewQuestion = async () => {
    setIsActive(false);
    setLoading(true);
    const result = await geminiService.generateUnexpectedQuestion('intermediate', 'general');
    setPromptData(result);
    setTimeLeft(result.timeLimitSeconds || 45);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isActive, timeLeft]);

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '10px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <Zap size={20} color="#06B6D4" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
              Thinking On Your Feet (Curveball Drills)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Train: THINK -&gt; STRUCTURE -&gt; RESPOND -&gt; LAND THE POINT under intense time pressure.
            </p>
          </div>
        </div>

        <button onClick={fetchNewQuestion} disabled={loading} className="btn-secondary">
          <RefreshCw size={16} className={loading ? "animate-spin-slow" : ""} />
          New Question
        </button>
      </div>

      {promptData && (
        <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #06B6D4' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span className="badge badge-indigo">Spontaneous Prompt</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: timeLeft <= 10 ? '#EF4444' : '#06B6D4' }}>
              <Clock size={18} />
              {timeLeft}s
            </div>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '10px', lineHeight: '1.4' }}>
            "{promptData.question}"
          </h2>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '12px 16px', borderRadius: '10px', marginTop: '14px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#38BDF8', marginBottom: '4px' }}>
              Target Goal & Pro-Tip
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
              {promptData.targetGoal}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px' }}>
              💡 Pro-Tip: {promptData.proTip}
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            {!isActive ? (
              <button onClick={() => setIsActive(true)} className="btn-primary" style={{ background: '#06B6D4' }}>
                <Play size={18} fill="white" />
                Start Timer & Speak Answer
              </button>
            ) : (
              <button onClick={() => setIsActive(false)} className="btn-danger">
                Stop Early & Self-Assess
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
