import React, { useState } from 'react';
import { Sparkles, HelpCircle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { geminiService } from '../../services/gemini';

export const ThreeHookGenerator = () => {
  const [topic, setTopic] = useState('How artificial intelligence is changing high school education');
  const [hooks, setHooks] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const result = await geminiService.generateThreeHooks(topic);
    setHooks(result);
    setLoading(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sparkles size={20} color="#8B5CF6" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>
            Three-Hook Mastery Exercise
          </h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Every major presentation or story can begin in multiple ways. Generate curiosity, emotional, and contrarian hooks to compare their psychological impact.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter any topic or speech theme..."
          style={{
            flex: 1,
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <button onClick={handleGenerate} disabled={loading} className="btn-primary">
          {loading ? <RefreshCw size={16} className="animate-spin-slow" /> : <Zap size={16} />}
          Generate 3 Hooks
        </button>
      </div>

      {hooks && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {/* Curiosity Hook */}
          <div className="glass-card" style={{ borderTop: '4px solid #6366F1' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#818CF8', marginBottom: '6px' }}>
              1. Curiosity Hook
            </div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>
              "{hooks.curiosityHook.text}"
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Why it works:</strong> {hooks.curiosityHook.explanation}
            </p>
          </div>

          {/* Emotional Hook */}
          <div className="glass-card" style={{ borderTop: '4px solid #8B5CF6' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A78BFA', marginBottom: '6px' }}>
              2. Emotional Hook
            </div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>
              "{hooks.emotionalHook.text}"
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Why it works:</strong> {hooks.emotionalHook.explanation}
            </p>
          </div>

          {/* Contrarian Hook */}
          <div className="glass-card" style={{ borderTop: '4px solid #F59E0B' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#FBBF24', marginBottom: '6px' }}>
              3. Contrarian Hook
            </div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>
              "{hooks.contrarianHook.text}"
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Why it works:</strong> {hooks.contrarianHook.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
