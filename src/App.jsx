import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { LiveSession } from './components/session/LiveSession';
import { PostSessionReport } from './components/analysis/PostSessionReport';
import { StorytellingStudio } from './components/storytelling/StorytellingStudio';
import { PracticeLab } from './components/practice/PracticeLab';
import { ProfileDashboard } from './components/profile/ProfileDashboard';
import { PrivacySettings } from './components/profile/PrivacySettings';
import { getProfile, getSettings } from './services/storage';

export function App() {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'report' | 'storytelling' | 'practice' | 'profile'
  const [intensity, setIntensity] = useState('professional');
  const [activePersona, setActivePersona] = useState('curious_beginner');
  const [profile, setProfile] = useState(getProfile());
  const [currentSessionData, setCurrentSessionData] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const saved = getSettings();
    if (saved.intensity) setIntensity(saved.intensity);
  }, []);

  const handleFinishSession = (sessionData) => {
    setCurrentSessionData(sessionData);
    setActiveTab('report');
  };

  const handleStartExercise = (exercise) => {
    setActiveTab('practice');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      {/* App Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        intensity={intensity}
        setIntensity={setIntensity}
        profile={profile}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Area */}
      <main style={{ flex: 1, paddingBottom: '40px' }}>
        {activeTab === 'live' && (
          <LiveSession
            intensity={intensity}
            onFinishSession={handleFinishSession}
            activePersona={activePersona}
            setActivePersona={setActivePersona}
          />
        )}

        {activeTab === 'report' && currentSessionData && (
          <PostSessionReport
            sessionData={currentSessionData}
            onStartExercise={handleStartExercise}
            onBackToLive={() => setActiveTab('live')}
          />
        )}

        {activeTab === 'storytelling' && <StorytellingStudio />}

        {activeTab === 'practice' && (
          <PracticeLab onLaunchSession={() => setActiveTab('live')} />
        )}

        {activeTab === 'profile' && (
          <ProfileDashboard profile={profile} setProfile={setProfile} />
        )}
      </main>

      {/* Settings Modal */}
      <PrivacySettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
