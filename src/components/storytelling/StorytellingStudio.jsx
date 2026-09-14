import React, { useState } from 'react';
import { BookOpen, Sparkles, RefreshCw, ArrowRight, Play, CheckCircle, Flame } from 'lucide-react';
import { ThreeHookGenerator } from './ThreeHookGenerator';
import { geminiService } from '../../services/gemini';

const REBUILD_ROUNDS = [
  { round: 1, title: 'Raw Outline', instruction: 'Tell me what happened in your story.' },
  { round: 2, title: '60-Second Challenge', instruction: 'Now condense the same story into 60 seconds.' },
  { round: 3, title: 'Hook Focus', instruction: 'Start with the most interesting, unexpected moment first.' },
  { round: 4, title: 'Conflict & Tension', instruction: 'Add explicit conflict—what was at risk if this failed?' },
  { round: 5, title: 'Emotional Stakes', instruction: 'Make the audience emotionally care about what happened.' },
  { round: 6, title: 'Lesson & Insight', instruction: 'State the takeaway lesson without sounding like a motivational cliché.' },
  { round: 7, title: 'Memorable Ending', instruction: 'Finish with a strong callback, insight, or punchy final line.' },
  { round: 8, title: 'Natural Delivery', instruction: 'Tell the entire reconstructed story naturally from start to finish.' }
];

export const StorytellingStudio = () => {
  const [userStory, setUserStory] = useState(`Three months into our engineering project, we realized the core feature we had spent $50,000 building might be completely useless to real users. We were panicking during a late-night debugging session when our intern suggested a radical alternative.`);
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [roundResponses, setRoundResponses] = useState({});
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'rebuild' | 'hooks'

  const handleAnalyzeStory = async () => {
    if (!userStory.trim()) return;
    setLoading(true);
    const result = await geminiService.analyzeStoryBreakdown(userStory);
    setBreakdown(result);
    setLoading(false);
  };

  const handleSaveRound = (text) => {
    setRoundResponses({
      ...roundResponses,
      [currentRoundIndex + 1]: text
    });
    if (currentRoundIndex < REBUILD_ROUNDS.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    }
  };

  const currentRound = REBUILD_ROUNDS[currentRoundIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      
      {/* Studio Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '6px solid #8B5CF6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
              Storytelling Studio & Rebuild Engine
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Transform stories from basic updates into memorable, high-impact narratives that audience remember.
            </p>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(30, 41, 59, 0.6)', padding: '4px', borderRadius: '12px' }}>
          <button
            onClick={() => setActiveTab('breakdown')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'breakdown' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'breakdown' ? 'white' : 'var(--text-muted)'
            }}
          >
            9-Part Story Breakdown
          </button>

          <button
            onClick={() => setActiveTab('rebuild')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'rebuild' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'rebuild' ? 'white' : 'var(--text-muted)'
            }}
          >
            8-Round Story Rebuild
          </button>

          <button
            onClick={() => setActiveTab('hooks')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'hooks' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'hooks' ? 'white' : 'var(--text-muted)'
            }}
          >
            Three-Hook Trainer
          </button>
        </div>
      </div>

      {/* TAB 1: 9-PART STORY BREAKDOWN */}
      {activeTab === 'breakdown' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '10px' }}>
              Input Raw Story Segment
            </h3>
            <textarea
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '14px',
                color: 'white',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                outline: 'none',
                resize: 'vertical'
              }}
            />
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleAnalyzeStory} disabled={loading} className="btn-primary" style={{ background: '#8B5CF6' }}>
                {loading ? <RefreshCw size={16} className="animate-spin-slow" /> : <Sparkles size={16} />}
                Deconstruct 9 Story Components
              </button>
            </div>
          </div>

          {breakdown && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
                Narrative Arc Deconstruction (Overall Story Score: {breakdown.overallStoryScore}/100)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {Object.entries(breakdown).map(([key, item]) => {
                  if (key === 'overallStoryScore') return null;
                  return (
                    <div key={key} className="glass-card" style={{ borderLeft: '3px solid #8B5CF6' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A78BFA', marginBottom: '4px' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'white', fontWeight: 500 }}>
                        {item.text || 'Not clearly established'}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        💡 {item.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: 8-ROUND STORY REBUILD TRAINER */}
      {activeTab === 'rebuild' && (
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-indigo">
                ROUND {currentRound.round} OF 8
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginTop: '6px' }}>
                {currentRound.title}
              </h3>
            </div>

            {/* Round Steps Timeline */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {REBUILD_ROUNDS.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentRoundIndex(idx)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: idx === currentRoundIndex ? '#8B5CF6' : roundResponses[r.round] ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {r.round}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <p style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600 }}>
              💡 Coach Instruction: {currentRound.instruction}
            </p>
          </div>

          <textarea
            value={roundResponses[currentRound.round] || ''}
            onChange={(e) => setRoundResponses({ ...roundResponses, [currentRound.round]: e.target.value })}
            placeholder="Type or speak your revised story chunk for this round..."
            rows={5}
            style={{
              width: '100%',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              color: 'white',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              outline: 'none'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentRoundIndex(Math.max(0, currentRoundIndex - 1))}
              disabled={currentRoundIndex === 0}
              className="btn-secondary"
            >
              Previous Round
            </button>

            <button
              onClick={() => handleSaveRound(roundResponses[currentRound.round] || '')}
              className="btn-primary"
              style={{ background: '#8B5CF6' }}
            >
              Next Round <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: THREE-HOOK TRAINER */}
      {activeTab === 'hooks' && <ThreeHookGenerator />}

    </div>
  );
};
