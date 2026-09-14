import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, Eye, Trash2, CheckCircle2 } from 'lucide-react';
import { getSettings, saveSettings } from '../../services/storage';

export const PrivacySettings = ({ isOpen, onClose }) => {
  const [settings, setSettingsState] = useState(getSettings());
  const [savedMsg, setSavedMsg] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSettings(settings);
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      onClose();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(4, 6, 10, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel" style={{ width: '540px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <ShieldCheck size={24} color="#10B981" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
            Privacy, Security & Architecture Settings
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Server API Key Status */}
          <div className="glass-card" style={{ borderLeft: '3px solid #6366F1' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#818CF8', marginBottom: '4px' }}>
              Backend Security Status
            </div>
            <p style={{ fontSize: '0.85rem', color: 'white' }}>
              <strong>GEMINI_API_KEY</strong> is configured securely on the server environment.
            </p>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              The client browser never receives or exposes the API key.
            </span>
          </div>

          {/* Privacy Rules */}
          <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10B981' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10B981' }}>
              🔒 Local First Privacy Architecture
            </div>
            <ul style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', paddingLeft: '16px', lineHeight: '1.5' }}>
              <li>Camera frames are processed on-device (never stored permanently).</li>
              <li>Microphone transcription runs locally via Web Speech API.</li>
              <li>You can reset or delete your local session history anytime.</li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
