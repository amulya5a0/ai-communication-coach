import React, { useState, useEffect } from 'react';
import { Award, AlertTriangle, CheckCircle, Sparkles, ArrowRight, Zap, RefreshCw, BookmarkPlus } from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';
import { BeforeAfterCard } from './BeforeAfterCard';
import { TimelineViewer } from './TimelineViewer';
import { geminiService } from '../../services/gemini';
import { saveSession } from '../../services/storage';

export const PostSessionReport = ({ sessionData, onStartExercise, onBackToLive }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function analyze() {
      setLoading(true);
      const generated = await geminiService.generatePostSessionReport(sessionData);
      setReport(generated);
      setLoading(false);

      if (generated) {
        saveSession({
          ...sessionData,
          overallScore: generated.overallScore,
          subScores: generated.subScores,
          fillerCount: sessionData.metrics.totalFillers,
          avgWpm: sessionData.metrics.wpm
        });
      }
    }
    analyze();
  }, [sessionData]);

  if (loading) {
    return (
      <div style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <RefreshCw size={36} color="#6366F1" className="animate-spin-slow" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
          AI Coach Analyzing Your Speech Session...
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Evaluating 17 communication sub-scores, narrative hooks, wit opportunities, and attention retention metrics.
        </p>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      
      {/* Top Banner & Overall Score */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '6px solid #6366F1' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-indigo">{sessionData.mode}</span>
            <span className="badge badge-amber">{sessionData.intensity} Mode</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>
            Post-Session Deep Coaching Analysis
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Session Duration: {Math.floor(sessionData.duration / 60)}m {sessionData.duration % 60}s | Words Spoken: {sessionData.metrics.wordCount} | Avg WPM: {sessionData.metrics.wpm}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <ScoreBadge score={report.overallScore} label="Overall Score" size="lg" />
          <button onClick={onBackToLive} className="btn-secondary">
            New Session
          </button>
        </div>
      </div>

      {/* ONE THING TO FIX FIRST (Prioritization Rule) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={26} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#FBBF24', letterSpacing: '0.05em' }}>
            ONE THING TO FIX FIRST (HIGHEST IMPACT)
          </div>
          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', marginTop: '2px' }}>
            {report.oneThingToFixFirst}
          </p>
        </div>
        <button onClick={() => onStartExercise && onStartExercise(report.practiceExercise)} className="btn-primary" style={{ background: '#F59E0B' }}>
          Train This Skill Now
        </button>
      </div>

      {/* 2-Column Layout: Strengths vs Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Top 3 Strengths */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <CheckCircle size={18} color="#10B981" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
              Top Strengths
            </h3>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
            {report.topStrengths.map((str, idx) => (
              <li key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px' }}>
                <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 3 Weaknesses */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertTriangle size={18} color="#EF4444" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
              Key Areas to Strengthen
            </h3>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
            {report.topWeaknesses.map((weak, idx) => (
              <li key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px' }}>
                <span style={{ color: '#EF4444', fontWeight: 800 }}>⚠</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 17 Communication Sub-Scores Grid */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: '18px' }}>
          Communication Sub-Scores Breakdown
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
          {Object.entries(report.subScores).map(([key, val]) => (
            <div key={key} className="glass-card" style={{ textAlign: 'center', padding: '14px 8px' }}>
              <ScoreBadge score={val} size="sm" />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Moment vs Weakest Moment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #10B981' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#10B981', marginBottom: '6px' }}>
            Best Moment (Highlight)
          </div>
          <p style={{ fontSize: '0.9rem', color: 'white', fontStyle: 'italic', marginBottom: '8px' }}>
            "{report.bestMoment.quote}"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Why it worked:</strong> {report.bestMoment.whyItWorked}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #EF4444' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#EF4444', marginBottom: '6px' }}>
            Weakest Moment (Opportunity)
          </div>
          <p style={{ fontSize: '0.9rem', color: 'white', fontStyle: 'italic', marginBottom: '8px' }}>
            "{report.weakestMoment.quote}"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Why it failed:</strong> {report.weakestMoment.whyItFailed}
          </p>
        </div>
      </div>

      {/* Before vs After Cards */}
      {report.beforeVsAfter && report.beforeVsAfter.map((item, idx) => (
        <BeforeAfterCard key={idx} item={item} />
      ))}

      {/* Wit & Storytelling Opportunities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="glass-card">
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '4px' }}>
            Wit Opportunity
          </div>
          <p style={{ fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>
            "{report.witOpportunity.suggestedWittyLine}"
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {report.witOpportunity.whyItWorks}
          </p>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#06B6D4', marginBottom: '4px' }}>
            Storytelling Opportunity
          </div>
          <p style={{ fontSize: '0.85rem', color: 'white' }}>
            {report.storytellingOpportunity.howToTransform}
          </p>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#F59E0B', marginBottom: '4px' }}>
            Audience Retention Technique
          </div>
          <p style={{ fontSize: '0.85rem', color: 'white' }}>
            {report.audienceEngagementOpportunity.engagementTechnique}
          </p>
        </div>
      </div>

      {/* Timeline Events */}
      <TimelineViewer events={report.timelineEvents} />
    </div>
  );
};
