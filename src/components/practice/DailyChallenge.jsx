import React from 'react';
import { Calendar, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const DAILY_SCHEDULE = [
  { day: 1, title: '60-Second Story', goal: 'Tell a complete personal micro-story with hook, conflict, and outcome.' },
  { day: 2, title: 'Zero Jargon Challenge', goal: 'Explain a complex technical concept so a 10-year-old understands.' },
  { day: 3, title: '20-Second Spontaneous Answer', goal: 'Answer a surprise question directly without any meta-commentary.' },
  { day: 4, title: 'Three-Hook Creation', goal: 'Draft a curiosity, emotional, and contrarian hook for the same idea.' },
  { day: 5, title: 'Surprising Ending', goal: 'Tell a 2-minute story that finishes with an unexpected callback or punchline.' },
  { day: 6, title: 'Serious + Lightness Rhythm', goal: 'Explain a serious topic while introducing 1 witty analogy.' },
  { day: 7, title: '3-Minute Public Pitch', goal: 'Deliver a full 3-minute speech maintaining high audience attention.' }
];

export const DailyChallenge = ({ completedDays = [1, 2], onSelectDay }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Calendar size={20} color="#10B981" />
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>
            Daily Adaptive Practice Roadmap
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Micro-drills designed to systematically eliminate your biggest communication bottlenecks.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {DAILY_SCHEDULE.map((item) => {
          const isDone = completedDays.includes(item.day);
          return (
            <div
              key={item.day}
              className="glass-card"
              onClick={() => onSelectDay && onSelectDay(item)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '12px 8px',
                borderTop: isDone ? '3px solid #10B981' : '3px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                {isDone ? <CheckCircle2 size={18} color="#10B981" /> : <Circle size={18} color="var(--text-dim)" />}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Day {item.day}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', marginTop: '4px', height: '36px', overflow: 'hidden' }}>
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
