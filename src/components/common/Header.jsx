import React from 'react';
import { Mic, BookOpen, Flame, BarChart3, Settings, ShieldAlert, Sparkles } from 'lucide-react';
import { INTENSITY_MODES } from '../../config/constants';

export const Header = ({ activeTab, setActiveTab, intensity, setIntensity, profile, onOpenSettings }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)'
        }}>
          <Mic size={22} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(90deg, #FFFFFF 0%, #CBD5E1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ORATOR <span style={{ color: '#6366F1', WebkitTextFillColor: '#6366F1' }}>AI</span>
          </h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Real-Time Speaking & Storytelling Coach
          </p>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(30, 41, 59, 0.5)', padding: '4px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          onClick={() => setActiveTab('live')}
          className={`nav-btn ${activeTab === 'live' ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'live' ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' : 'transparent',
            color: activeTab === 'live' ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <Mic size={16} />
          Live Studio
        </button>

        <button
          onClick={() => setActiveTab('storytelling')}
          className={`nav-btn ${activeTab === 'storytelling' ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'storytelling' ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' : 'transparent',
            color: activeTab === 'storytelling' ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <BookOpen size={16} />
          Storytelling Studio
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'practice' ? 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' : 'transparent',
            color: activeTab === 'practice' ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <Flame size={16} />
          Practice Lab
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'profile' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
            color: activeTab === 'profile' ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <BarChart3 size={16} />
          Analytics & Profile
        </button>
      </nav>

      {/* Right Controls: Intensity & Quick Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Coaching Intensity Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(30, 41, 59, 0.6)', padding: '4px 10px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Sparkles size={14} color="#F59E0B" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Coach Mode:</span>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="supportive" style={{ background: '#0F172A' }}>Supportive</option>
            <option value="professional" style={{ background: '#0F172A' }}>Professional</option>
            <option value="brutal" style={{ background: '#0F172A' }}>Brutal (Unfiltered)</option>
          </select>
        </div>

        {/* Global Growth Score Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 12px', borderRadius: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Growth Score</span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#10B981' }}>
            {profile?.overallScore || 78}
          </span>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '8px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
