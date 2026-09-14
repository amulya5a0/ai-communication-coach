import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Flame } from 'lucide-react';

export const TimelineViewer = ({ events }) => {
  if (!events || events.length === 0) return null;

  const getEventIcon = (type) => {
    if (type === 'strength') return <CheckCircle size={16} color="#10B981" />;
    if (type === 'filler') return <Flame size={16} color="#F59E0B" />;
    return <AlertTriangle size={16} color="#EF4444" />;
  };

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Clock size={18} color="#6366F1" />
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
          Interactive Session Timeline
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((event, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '12px 16px',
              borderLeft: event.type === 'strength' ? '3px solid #10B981' : event.type === 'filler' ? '3px solid #F59E0B' : '3px solid #EF4444'
            }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px 8px',
              borderRadius: '6px'
            }}>
              {event.timestamp}
            </span>

            <div style={{ marginTop: '2px' }}>
              {getEventIcon(event.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                {event.title}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
