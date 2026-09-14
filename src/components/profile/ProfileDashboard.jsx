import React from 'react';
import { BarChart3, TrendingUp, Calendar, Clock, Award, AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';
import { getProfile, getSessions, clearData } from '../../services/storage';

export const ProfileDashboard = ({ profile, setProfile }) => {
  const sessions = getSessions();
  const activeProfile = profile || getProfile();

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to reset your communication profile and session history?")) {
      clearData();
      setProfile(getProfile());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      
      {/* Profile Overview Header */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '6px solid #10B981' }}>
        <div>
          <span className="badge badge-emerald">Personal Communication Profile</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>
            Communication Growth & Performance Analytics
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Long-term trajectory across {activeProfile.sessionsCompleted} completed speaking sessions ({activeProfile.totalSpeakingMinutes} minutes total).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <ScoreBadge score={activeProfile.overallScore} label="Growth Score" size="lg" />
        </div>
      </div>

      {/* 2-Column: Recurring Patterns & Sub-Scores Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px' }}>
        
        {/* Left Column: AI-Detected Long-Term Patterns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <TrendingUp size={18} color="#10B981" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
                AI-Detected Communication Patterns
              </h3>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
              {activeProfile.recurringPatterns?.map((pattern, idx) => (
                <li key={idx} className="glass-card" style={{ fontSize: '0.85rem', color: 'var(--text-main)', padding: '12px', borderLeft: '3px solid #6366F1' }}>
                  "{pattern}"
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
            <button onClick={handleClearHistory} style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Trash2 size={14} /> Clear Profile & Session History
            </button>
          </div>
        </div>

        {/* Right Column: 17 Sub-Scores Detailed Progress */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '18px' }}>
            Sub-Score Trajectory Across 17 Skill Dimensions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {Object.entries(activeProfile.subScores || {}).map(([key, score]) => (
              <div key={key} className="glass-card" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{key}</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: score >= 80 ? '#10B981' : score >= 70 ? '#6366F1' : '#F59E0B' }}>
                    {score}
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${score}%`,
                      height: '100%',
                      background: score >= 80 ? '#10B981' : score >= 70 ? '#6366F1' : '#F59E0B',
                      borderRadius: '3px',
                      transition: 'width 0.6s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Session History Log */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
          Recent Session History ({sessions.length})
        </h3>
        {sessions.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            No sessions recorded yet. Start your first live speaking session to see session logs here!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sessions.map((sess, idx) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-indigo">{sess.mode}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                      {new Date(sess.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Duration: {sess.duration}s | WPM: {sess.metrics?.wpm} | Fillers: {sess.metrics?.totalFillers}
                  </div>
                </div>

                <ScoreBadge score={sess.overallScore || 78} size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
