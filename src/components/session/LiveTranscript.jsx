import React, { useEffect, useRef } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { FILLER_WORDS } from '../../config/constants';

export const LiveTranscript = ({ transcriptData, isLive }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transcriptData]);

  const renderHighlightedText = (text) => {
    if (!text) return <span style={{ color: 'var(--text-dim)', italic: 'true' }}>Waiting for speech input...</span>;

    const regex = new RegExp(`\\b(${FILLER_WORDS.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      const isFiller = FILLER_WORDS.includes(part.toLowerCase());
      if (isFiller) {
        return (
          <span
            key={idx}
            style={{
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#FBBF24',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '1px 6px',
              borderRadius: '4px',
              fontWeight: 600,
              margin: '0 2px'
            }}
          >
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '220px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={16} color="#6366F1" />
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Live Speech Transcript
          </h3>
        </div>
        {isLive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#10B981' }}>
            <Sparkles size={12} />
            Listening...
          </div>
        )}
      </div>

      {/* Auto-scrolling Stream */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '6px',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: 'var(--text-main)',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {transcriptData?.fullText ? (
          <div>
            {renderHighlightedText(transcriptData.fullText)}
            {transcriptData?.interimText && (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginLeft: '6px' }}>
                {transcriptData.interimText}
              </span>
            )}
          </div>
        ) : (
          <p style={{ color: 'var(--text-dim)', fontStyle: 'italic', fontSize: '0.9rem' }}>
            {isLive ? "Speak naturally into your microphone..." : "Transcript will stream continuously when live session starts."}
          </p>
        )}
      </div>
    </div>
  );
};
