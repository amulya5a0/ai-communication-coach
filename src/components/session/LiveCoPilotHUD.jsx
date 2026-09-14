import React from 'react';
import { AlertCircle, Zap, Activity, Clock, Layers, Sparkles } from 'lucide-react';

export const LiveCoPilotHUD = ({ activeSignal, metrics, isLive, sessionDuration }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRiskBadge = (level) => {
    if (level === 'High') return { label: 'High Attention Risk', bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' };
    if (level === 'Medium') return { label: 'Moderate Risk', bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' };
    return { label: 'Optimal Engagement', bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: 'rgba(16, 185, 129, 0.3)' };
  };

  const riskInfo = getRiskBadge(metrics?.attentionRiskLevel || 'Low');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* Timer & Session Status Bar */}
      <div className="glass-panel" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Clock size={18} color="#6366F1" />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>
            {formatTime(sessionDuration || 0)}
          </span>
        </div>

        {/* Attention Risk Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: riskInfo.bg,
          color: riskInfo.color,
          border: `1px solid ${riskInfo.border}`,
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          <AlertCircle size={14} />
          {riskInfo.label}
        </div>
      </div>

      {/* Selective Live Co-Pilot Micro-Nudge HUD Signal Card */}
      {activeSignal && isLive && (
        <div className="hud-signal-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={20} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A5B4FC' }}>
              Live Co-Pilot Signal
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginTop: '2px' }}>
              "{activeSignal.signalText}"
            </div>
          </div>
        </div>
      )}

      {/* Real-time Telemetry Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Activity size={12} color="#06B6D4" /> WPM Pace
          </div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: metrics?.wpm > 170 ? '#EF4444' : metrics?.wpm < 110 ? '#F59E0B' : '#10B981' }}>
            {metrics?.wpm || 0}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Target: 130-160</div>
        </div>

        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Layers size={12} color="#F59E0B" /> Fillers
          </div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: metrics?.totalFillers > 5 ? '#EF4444' : '#F59E0B' }}>
            {metrics?.totalFillers || 0}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>um, uh, like</div>
        </div>

        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Zap size={12} color="#8B5CF6" /> Pauses
          </div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>
            {metrics?.pauseCount || 0}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>&gt; 2s breath</div>
        </div>
      </div>
    </div>
  );
};
