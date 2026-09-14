import React, { useState } from 'react';
import { Users, Smile, HelpCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { AUDIENCE_PERSONAS } from '../../config/constants';

export const AudienceSimulator = ({ activePersona, setActivePersona, transcriptText, isLive }) => {
  const selectedPersona = AUDIENCE_PERSONAS.find(p => p.id === activePersona) || AUDIENCE_PERSONAS[0];

  const getPersonaReaction = () => {
    if (!isLive) return "Select an audience persona to simulate real-time audience engagement.";

    switch (activePersona) {
      case 'senior_executive':
        return "Executive thinking: 'Get to the ROI and bottom line upfront. What is the key decision?'";
      case 'technical_expert':
        return "Technical expert thinking: 'Clear logic so far. Will they explain the architectural tradeoffs?'";
      case 'curious_beginner':
        return "Beginner thinking: 'I follow the general idea, but give me an everyday real-world analogy.'";
      case 'bored_audience':
        return "Audience attention fading: 'Need a curiosity gap or emotional hook to stay locked in.'";
      case 'hostile_questioner':
        return "Skeptic thinking: 'I hear the claim, but where is the hard empirical evidence?'";
      default:
        return "Audience listening closely to narrative flow and clarity.";
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} color="#06B6D4" />
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Audience Simulation Engine
          </h3>
        </div>
        <span className="badge badge-indigo">
          {selectedPersona.name}
        </span>
      </div>

      {/* Persona Selector Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {AUDIENCE_PERSONAS.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePersona(p.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: activePersona === p.id ? '1px solid #06B6D4' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activePersona === p.id ? 'rgba(6, 182, 212, 0.2)' : 'rgba(30, 41, 59, 0.4)',
              color: activePersona === p.id ? '#38BDF8' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Simulated Live Internal Monologue Card */}
      <div className="glass-card" style={{ padding: '12px 14px', borderLeft: '3px solid #06B6D4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#38BDF8', fontWeight: 600, marginBottom: '4px' }}>
          <Sparkles size={12} />
          SIMULATED AUDIENCE INTERNAL REACTION
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic' }}>
          "{getPersonaReaction()}"
        </p>
      </div>
    </div>
  );
};
