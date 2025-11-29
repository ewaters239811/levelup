export type ArchetypeKey = 
  | 'UNFOCUSED_VISIONARY' 
  | 'SILENT_GRINDER' 
  | 'OVERGIVER' 
  | 'CAGED_POTENTIAL' 
  | 'lone_wolf_thinker' 
  | 'impulsive_firestarter' 
  | 'doubt_ridden_strategist';

export interface BreakthroughMap {
  patternSummary: string;
  rootDriver: string;
  identityShift: string;
  keyPractices: string[];
  futureVision: string;
  scriptureAnchor?: string;
}

export const BREAKTHROUGH_MAP: Record<ArchetypeKey, BreakthroughMap> = {
  OVERGIVER: {
    patternSummary:
      'You give more energy, time, and emotion than you receive, then quietly carry resentment or burnout.',
    rootDriver:
      'A fear that you\'ll lose love, safety, or connection if you stop being "the helpful one."',
    identityShift:
      'From "I am valuable when I give" → "My standards and presence are inherently valuable."',
    keyPractices: [
      'Say no to one draining request this week.',
      'Schedule non-negotiable time for your own goals.',
      'Ask for support instead of automatically offering it.'
    ],
    futureVision:
      'You help others from overflow, not depletion—your boundaries make your giving more powerful.',
    scriptureAnchor: '"Guard your heart above all else, for it determines the course of your life." – Proverbs 4:23'
  },
  UNFOCUSED_VISIONARY: {
    patternSummary:
      'You have big ideas and strong intuition, but your energy is scattered across too many paths.',
    rootDriver:
      'Avoidance of commitment and fear of failing if you go all-in on one clear path.',
    identityShift:
      'From "I'm interested in everything" → "I'm a finisher who channels vision into one main mission."',
    keyPractices: [
      'Choose one primary goal for the next 90 days.',
      'Kill or pause 2–3 side projects that dilute your focus.',
      'Create a simple weekly ritual to track progress on your main goal.'
    ],
    futureVision:
      'Your gifts are no longer scattered—you become known for the one thing you consistently execute.',
    scriptureAnchor: '"A double-minded man is unstable in all his ways." – James 1:8'
  },
  SILENT_GRINDER: {
    patternSummary:
      'You work hard and stay consistent behind the scenes, but rarely claim credit or visibility.',
    rootDriver:
      'Fear of judgment or rejection if you step into the spotlight, plus a belief that "work should speak for itself."',
    identityShift:
      'From "I'm just doing my job" → "I'm a leader whose presence and results deserve to be seen."',
    keyPractices: [
      'Share one win per week with someone who matters (manager, audience, client).',
      'Practice speaking about your work with calm confidence.',
      'Say yes to one visible opportunity: a meeting, presentation, or post.'
    ],
    futureVision:
      'Your quiet consistency turns into visible authority—people now recognize and reward your value.',
    scriptureAnchor: '"Do not hide your light under a basket… let it shine." – Matthew 5:15–16'
  },
  CAGED_POTENTIAL: {
    patternSummary:
      'You feel immense capability inside, but fear, overthinking, or comfort keeps you moving in half-steps instead of full decisions.',
    rootDriver:
      'The belief that potential is safer than actualization—fear that stepping into power will expose you to judgment or failure.',
    identityShift:
      'From "I have potential" → "I am already powerful, and I act from that power now."',
    keyPractices: [
      'Identify one decision you\'ve been avoiding and commit to a deadline within 7 days.',
      'Do one uncomfortable action that signals to your brain: "We are not the old version anymore."',
      'Audit your environment—remove one habit, space, or relationship that keeps you playing small.'
    ],
    futureVision:
      'Your potential transforms into demonstrated power—you move from "could be" to "already is," and the world responds accordingly.',
    scriptureAnchor: '"For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline." – 2 Timothy 1:7'
  },
  lone_wolf_thinker: {
    patternSummary:
      'You think deeply in isolation, processing everything internally, but your insights rarely reach the world or get tested in reality.',
    rootDriver:
      'A belief that working alone is superior, combined with a fear that others won\'t understand your depth or will dilute your vision.',
    identityShift:
      'From "I think best alone" → "My insights become real when they're shared and tested in collaboration."',
    keyPractices: [
      'Share one insight this week: Write it down, tell someone, or post it somewhere.',
      'Practice "thinking out loud": Let someone witness your thought process, even if it feels vulnerable.',
      'Find one person who can handle your depth: Start small, share one complex idea.'
    ],
    futureVision:
      'Your isolated brilliance becomes collaborative power—your ideas get refined, amplified, and implemented through connection.',
    scriptureAnchor: '"As iron sharpens iron, so one person sharpens another." – Proverbs 27:17'
  },
  impulsive_firestarter: {
    patternSummary:
      'You move fast, start projects with high energy, but rarely stay to tend the flame—you abandon fires to start new ones.',
    rootDriver:
      'Addiction to the high of starting combined with an aversion to the "boring" middle phase where real results are built.',
    identityShift:
      'From "I'm a starter" → "I'm a completer who finds meaning in the full cycle, not just the spark."',
    keyPractices: [
      'Choose one fire to tend: Pick one thing you started and commit to maintaining it for 30 days.',
      'Practice "boring consistency": Do one thing every day, even when it doesn\'t feel exciting.',
      'Notice your impulse to start new things: Before starting something new, ask: "Am I running from something I should finish?"'
    ],
    futureVision:
      'Your speed becomes sustainable momentum—you transform from someone who starts everything to someone who finishes what matters.',
    scriptureAnchor: '"Being confident of this, that he who began a good work in you will carry it on to completion." – Philippians 1:6'
  },
  doubt_ridden_strategist: {
    patternSummary:
      'You\'re brilliant at strategy and can see all angles, but doubt keeps you from executing—you plan more instead of acting.',
    rootDriver:
      'Your identity is built around being smart and right, so the risk of being wrong (or imperfect) terrifies you into perpetual planning.',
    identityShift:
      'From "I need perfect strategy" → "I act from preparation, then adapt—my intelligence shows in execution, not just planning."',
    keyPractices: [
      'Act on one plan this week: Pick a strategy and execute it, even if you don\'t feel 100% ready.',
      'Practice "good enough planning": Set a time limit for planning, then force yourself to act.',
      'Notice your doubt: When doubt comes up, acknowledge it, then act anyway.'
    ],
    futureVision:
      'Your strategic mind becomes an execution engine—you move from analysis paralysis to decisive action, and your results prove your wisdom.',
    scriptureAnchor: '"Do not merely listen to the word, and so deceive yourselves. Do what it says." – James 1:22'
  }
};

