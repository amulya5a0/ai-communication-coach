// Application Constants & Configuration

export const SPEAKING_MODES = [
  {
    id: 'casual',
    title: 'Casual Conversation',
    description: 'Train natural responses, conversational flow, wit, spontaneity, and avoiding awkward pauses.',
    icon: 'MessageCircle',
    targetWpm: [130, 160],
    focusAreas: ['Natural Flow', 'Wit', 'Listening', 'Active Questions']
  },
  {
    id: 'public_speaking',
    title: 'Public Speaking',
    description: 'Master powerful hooks, structured narrative arc, dramatic pauses, and memorable endings.',
    icon: 'Mic',
    targetWpm: [120, 150],
    focusAreas: ['Opening Hook', 'Pacing & Pauses', 'Stakes', 'Memorable Closing']
  },
  {
    id: 'presentation',
    title: 'Presentation',
    description: 'Explain complex slide concepts without reading text, keeping executive audience engaged.',
    icon: 'Presentation',
    targetWpm: [125, 155],
    focusAreas: ['Concept Explanation', 'Slide Transitions', 'Executive Impact']
  },
  {
    id: 'interview',
    title: 'Interview (STAR)',
    description: 'Deliver concise behavioral & technical answers using Situation, Task, Action, Result.',
    icon: 'Briefcase',
    targetWpm: [130, 165],
    focusAreas: ['STAR Storytelling', 'Conciseness', 'Direct Answer First']
  },
  {
    id: 'technical_explanation',
    title: 'Technical Explanation',
    description: 'Simplify complex algorithms or architectures using intuitive analogies and concrete examples.',
    icon: 'Cpu',
    targetWpm: [115, 145],
    focusAreas: ['Jargon Removal', 'Analogy Design', 'Layered Detail']
  },
  {
    id: 'storytelling',
    title: 'Storytelling Studio',
    description: 'Master the 9-part storytelling arc: Hook, Setup, Character, Conflict, Stakes, Turning Point, Resolution, Meaning, Ending.',
    icon: 'BookOpen',
    targetWpm: [120, 150],
    focusAreas: ['Curiosity Hook', 'Conflict & Stakes', 'Emotional Contrast']
  },
  {
    id: 'debate',
    title: 'Debate / Discussion',
    description: 'Think under high pressure, build structured arguments, withstand counterarguments, and land rebuttals.',
    icon: 'ShieldAlert',
    targetWpm: [135, 170],
    focusAreas: ['Structured Claims', 'Counterargument Defense', 'Composure']
  },
  {
    id: 'networking',
    title: 'Networking & Introductions',
    description: 'Deliver memorable personal intros, ask high-curiosity questions, and eliminate generic answers.',
    icon: 'Users',
    targetWpm: [130, 160],
    focusAreas: ['Personal Hook', 'Curiosity Questions', 'Memorable Impression']
  },
  {
    id: 'unexpected_questions',
    title: 'Unexpected Questions',
    description: 'AI fires rapid curveball questions. Train: THINK -> STRUCTURE -> RESPOND -> LAND THE POINT.',
    icon: 'Zap',
    targetWpm: [125, 160],
    focusAreas: ['Spontaneous Structure', 'Confidence under ambiguity']
  }
];

export const INTENSITY_MODES = {
  SUPPORTIVE: {
    id: 'supportive',
    label: 'Supportive',
    description: 'Encouraging, gentle, and focuses heavily on positive progress.',
    badgeClass: 'badge-emerald'
  },
  PROFESSIONAL: {
    id: 'professional',
    label: 'Professional',
    description: 'Direct, objective, and practical like an executive coach.',
    badgeClass: 'badge-indigo'
  },
  BRUTAL: {
    id: 'brutal',
    label: 'Brutal (Unfiltered)',
    description: 'Unfiltered, razor-sharp constructive feedback with zero sugarcoating.',
    badgeClass: 'badge-rose'
  }
};

export const AUDIENCE_PERSONAS = [
  { id: 'curious_beginner', name: 'Curious Beginner', description: 'Needs simple analogies, zero jargon, relatable context.' },
  { id: 'senior_executive', name: 'Senior Executive', description: 'Impatient, wants bottom line upfront, business impact, ultra-concise.' },
  { id: 'technical_expert', name: 'Technical Expert', description: 'Demands precision, logic rigor, depth, questions hand-waving.' },
  { id: 'skeptical_interviewer', name: 'Skeptical Interviewer', description: 'Probes weak claims, tests confidence under stress, looks for STAR framework.' },
  { id: 'bored_audience', name: 'Bored Audience', description: 'Loses interest in 20 seconds unless curiosity gap or emotional hook is used.' },
  { id: 'hostile_questioner', name: 'Hostile Questioner', description: 'Pushes back aggressively, tests emotional control and calm reasoning.' }
];

export const FILLER_WORDS = [
  'um', 'uh', 'like', 'basically', 'actually', 'you know', 
  'kind of', 'sort of', 'i mean', 'so', 'right', 'literally', 
  'honestly', 'pretty much', 'definitely', 'obviously'
];

export const DEFAULT_COMMUNICATION_PROFILE = {
  overallScore: 78,
  sessionsCompleted: 12,
  totalSpeakingMinutes: 48,
  subScores: {
    Clarity: 82,
    Structure: 75,
    Conciseness: 70,
    Storytelling: 68,
    Vocabulary: 85,
    Grammar: 92,
    Confidence: 80,
    Delivery: 74,
    Pace: 79,
    Pausing: 72,
    FillerControl: 65,
    AudienceEngagement: 74,
    Wit: 69,
    EmotionalConnection: 71,
    SpontaneousThinking: 76,
    AudienceAwareness: 77,
    NonVerbal: 81
  },
  recurringPatterns: [
    "Frequently starts responses with 'Basically'",
    "Tends to explain background for ~40s before stating the main point",
    "High technical accuracy; opportunities for emotional storytelling & wit",
    "Pace accelerates to 175+ WPM when addressing unexpected questions"
  ],
  fillerTrend: [14, 11, 9, 12, 8, 6, 5],
  wpmTrend: [165, 158, 142, 148, 138, 140],
  storytellingTrend: [55, 60, 62, 65, 68]
};
