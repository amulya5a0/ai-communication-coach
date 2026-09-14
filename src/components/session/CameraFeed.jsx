import React, { useEffect, useRef } from 'react';
import { Camera, Eye, Activity, User, ShieldCheck } from 'lucide-react';
import { visionService } from '../../services/vision';

export const CameraFeed = ({ isLive, nonVerbalMetrics, setNonVerbalMetrics }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isLive) {
      visionService.startCamera(videoRef, (metrics) => {
        if (setNonVerbalMetrics) setNonVerbalMetrics(metrics);
      });
    } else {
      visionService.stopCamera();
    }

    return () => {
      visionService.stopCamera();
    };
  }, [isLive]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '280px',
      background: '#04060A',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Video Feed */}
      <video
        ref={videoRef}
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)', // Mirror feed for natural feeling
          display: isLive ? 'block' : 'none'
        }}
      />

      {/* Camera Inactive Placeholder */}
      {!isLive && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, #04060A 80%)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Camera size={28} color="var(--text-muted)" />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Camera Ready — Click Start Live Session
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <ShieldCheck size={14} color="#10B981" />
            Local visual processing (Privacy Protected)
          </div>
        </div>
      )}

      {/* Live Visual Overlay Badges */}
      {isLive && (
        <>
          {/* Top Left Rec & Mode Tag */}
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div className="animate-rec-dot" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'white' }}>
              VISION ANALYTICS ON
            </span>
          </div>

          {/* Bottom Non-Verbal Metrics HUD */}
          <div style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            right: '14px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: '10px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={16} color="#6366F1" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Eye Stability</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                  {nonVerbalMetrics?.eyeContactStability || 92}%
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#10B981" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gestures & Energy</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                  {nonVerbalMetrics?.gestureActivity || 55}%
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} color="#06B6D4" />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Expressiveness</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                  {nonVerbalMetrics?.expressiveness || 78}%
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
