import React, { useState } from 'react';
import { Flame, BookOpen, Smile, Zap, Target, Sparkles } from 'lucide-react';
import { ThinkingOnFeet } from './ThinkingOnFeet';
import { DailyChallenge } from './DailyChallenge';

export const PracticeLab = ({ onLaunchSession }) => {
  const [activeCategory, setActiveCategory] = useState('spontaneous'); // 'spontaneous' | 'wit' | 'star' | 'daily'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '6px solid #06B6D4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
              Targeted Communication Practice Lab
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Dedicated skill exercises targeting storytelling, wit, conciseness, and spontaneous thinking under pressure.
            </p>
          </div>
        </div>

        {/* Categories navigation */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(30, 41, 59, 0.6)', padding: '4px', borderRadius: '12px' }}>
          <button
            onClick={() => setActiveCategory('spontaneous')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeCategory === 'spontaneous' ? '#06B6D4' : 'transparent',
              color: activeCategory === 'spontaneous' ? 'white' : 'var(--text-muted)'
            }}
          >
            Spontaneous Drills
          </button>

          <button
            onClick={() => setActiveCategory('wit')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeCategory === 'wit' ? '#06B6D4' : 'transparent',
              color: activeCategory === 'wit' ? 'white' : 'var(--text-muted)'
            }}
          >
            Wit & Lightness Coach
          </button>

          <button
            onClick={() => setActiveCategory('daily')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeCategory === 'daily' ? '#06B6D4' : 'transparent',
              color: activeCategory === 'daily' ? 'white' : 'var(--text-muted)'
            }}
          >
            7-Day Roadmap
          </button>
        </div>
      </div>

      {/* 7-Day Daily Challenge Roadmap Banner */}
      <DailyChallenge />

      {/* Selected Practice Module */}
      {activeCategory === 'spontaneous' && <ThinkingOnFeet />}

      {activeCategory === 'wit' && (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smile size={20} color="#F59E0B" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
              Serious Content + Lightness Rhythm Coach
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Wit is NOT telling jokes. Wit is creating contrast, understated analogies, and naturalCallbacks so heavy topics feel engaging.
          </p>

          <div className="glass-card" style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#F59E0B', marginBottom: '8px' }}>
              Master Speech Rhythm Pattern:
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: 'white' }}>
              SERIOUS CONCEPT → EXPLANATION → CONCRETE EXAMPLE → LIGHT OBSERVATION / ANALOGY → SERIOUS INSIGHT → MEMORABLE LANDING
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'daily' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
            Recommended Next Challenge
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Based on your long-term communication profile: Your filler count and technical explanations are high. Your next growth bottleneck is <strong>Storytelling & Emotional Stakes</strong>.
          </p>
        </div>
      )}

    </div>
  );
};
