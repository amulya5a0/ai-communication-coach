// Local Storage & Profile Management Service

import { DEFAULT_COMMUNICATION_PROFILE } from '../config/constants';

const STORAGE_KEYS = {
  PROFILE: 'orator_comm_profile',
  SESSIONS: 'orator_session_history',
  SETTINGS: 'orator_app_settings'
};

export const getProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!data) return DEFAULT_COMMUNICATION_PROFILE;
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load communication profile:', err);
    return DEFAULT_COMMUNICATION_PROFILE;
  }
};

export const saveProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
};

export const getSessions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load session history:', err);
    return [];
  }
};

export const saveSession = (sessionData) => {
  try {
    const sessions = getSessions();
    const updated = [sessionData, ...sessions].slice(0, 50); // Keep last 50 sessions
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    
    // Update global profile stats
    const currentProfile = getProfile();
    const newTotalSessions = currentProfile.sessionsCompleted + 1;
    const newSpeakingMinutes = currentProfile.totalSpeakingMinutes + Math.round((sessionData.duration || 60) / 60);
    
    // Merge new sub-scores if available
    const newSubScores = { ...currentProfile.subScores };
    if (sessionData.subScores) {
      Object.keys(sessionData.subScores).forEach(key => {
        if (newSubScores[key] !== undefined) {
          // Weighted moving average
          newSubScores[key] = Math.round((newSubScores[key] * 0.7) + (sessionData.subScores[key] * 0.3));
        }
      });
    }
    
    // Merge filler trend
    const newFillerTrend = [...(currentProfile.fillerTrend || []), sessionData.fillerCount || 0].slice(-7);
    const newWpmTrend = [...(currentProfile.wpmTrend || []), Math.round(sessionData.avgWpm || 140)].slice(-7);

    const updatedProfile = {
      ...currentProfile,
      overallScore: sessionData.overallScore || currentProfile.overallScore,
      sessionsCompleted: newTotalSessions,
      totalSpeakingMinutes: newSpeakingMinutes,
      subScores: newSubScores,
      fillerTrend: newFillerTrend,
      wpmTrend: newWpmTrend
    };
    
    saveProfile(updatedProfile);
    return updatedProfile;
  } catch (err) {
    console.error('Failed to save session:', err);
  }
};

export const getSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const defaults = {
      intensity: 'professional',
      privacyMode: 'local_only',
      autoRecord: true,
      soundEffects: true
    };
    return data ? { ...defaults, ...JSON.parse(data) } : defaults;
  } catch (err) {
    return {
      intensity: 'professional',
      privacyMode: 'local_only'
    };
  }
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
};

export const clearData = () => {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
};
