import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export const BeforeAfterCard = ({ item }) => {
  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={18} color="#8B5CF6" />
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
          Before vs After Skill Training
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {/* User Said */}
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#F87171', marginBottom: '6px' }}>
            User Said (Raw)
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: '1.5' }}>
            "{item.userSaid}"
          </p>
        </div>

        {/* Better Version */}
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#818CF8', marginBottom: '6px' }}>
            Better (Clearer)
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
            "{item.betterVersion}"
          </p>
        </div>

        {/* Best Version */}
        <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#34D399', marginBottom: '6px' }}>
            Best (Memorable)
          </div>
          <p style={{ fontSize: '0.85rem', color: 'white', fontWeight: 600, lineHeight: '1.5' }}>
            "{item.bestVersion}"
          </p>
        </div>
      </div>

      {/* Explanatory Rationale */}
      <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <HelpCircle size={16} color="#6366F1" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'white' }}>Why this works:</strong> {item.reasoning}
        </div>
      </div>
    </div>
  );
};
