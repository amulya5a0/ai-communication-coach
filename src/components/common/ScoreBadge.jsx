import React from 'react';

export const ScoreBadge = ({ score, label, size = 'md', subtitle }) => {
  const getScoreColor = (val) => {
    if (val >= 85) return { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.3)', text: 'text-emerald-400' };
    if (val >= 70) return { stroke: '#6366F1', glow: 'rgba(99, 102, 241, 0.3)', text: 'text-indigo-400' };
    if (val >= 55) return { stroke: '#F59E0B', glow: 'rgba(245, 158, 11, 0.3)', text: 'text-amber-400' };
    return { stroke: '#EF4444', glow: 'rgba(239, 68, 68, 0.3)', text: 'text-rose-400' };
  };

  const colors = getScoreColor(score);
  const radius = size === 'lg' ? 52 : size === 'sm' ? 24 : 36;
  const strokeWidth = size === 'lg' ? 8 : size === 'sm' ? 4 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <div style={{ position: 'relative', width: `${svgSize}px`, height: `${svgSize}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={svgSize} height={svgSize} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 0.8s ease-in-out',
              filter: `drop-shadow(0 0 6px ${colors.glow})`
            }}
          />
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <span style={{ 
            fontFamily: 'Outfit, sans-serif', 
            fontWeight: 800, 
            fontSize: size === 'lg' ? '1.8rem' : size === 'sm' ? '0.9rem' : '1.25rem',
            color: colors.stroke 
          }}>
            {score}
          </span>
        </div>
      </div>
      {label && (
        <span style={{ fontSize: size === 'lg' ? '0.9rem' : '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
      )}
      {subtitle && (
        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
};
