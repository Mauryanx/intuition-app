export type PersonaKey = 'seer' | 'strategist' | 'navigator';

type ScienceCard = {
  id: string;
  title: string;
  body: string;
};

type ReflectionOption = {
  id: string;
  label: string;
  description: string;
  persona: PersonaKey;
};

type QuizChoice = {
  id: string;
  label: string;
  persona: PersonaKey;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
};

export const scienceCards: ScienceCard[] = [
  {
    id: 'speed',
    title: 'Speed with substance',
    body: 'High performers pair fast intuition with guardrails. Our mini-games train rapid pattern recognition while scoring accuracy.',
  },
  {
    id: 'signal',
    title: 'Signal over noise',
    body: 'Each session sharpens your ability to surface the meaningful cues hiding in ambiguity—critical for creative and strategic work.',
  },
  {
    id: 'feedback',
    title: 'Feedback that sticks',
    body: 'After every run you see streaks, z-scores, and cohort percentiles so intuition growth feels tangible.',
  },
];

export const reflectionOptions: ReflectionOption[] = [
  {
    id: 'career',
    label: 'Make quicker calls at work',
    description: 'I want to ship decisions with less second-guessing.',
    persona: 'strategist',
  },
  {
    id: 'creative',
    label: 'Ignite creative instincts',
    description: 'I want better pattern leaps when inspiration strikes.',
    persona: 'seer',
  },
  {
    id: 'life',
    label: 'Trust my gut day-to-day',
    description: 'I want a steadier inner compass for relationships and life moves.',
    persona: 'navigator',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'When information is messy, I usually…',
    choices: [
      { id: 'q1-1', label: 'Spot the pattern others miss', persona: 'seer' },
      {
        id: 'q1-2',
        label: 'Frame scenarios and pick a direction',
        persona: 'strategist',
      },
      { id: 'q1-3', label: 'Gut-check with experience and choose', persona: 'navigator' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Deadlines are hours away—how do you decide?',
    choices: [
      { id: 'q2-1', label: 'Lean into instinctive leaps', persona: 'seer' },
      { id: 'q2-2', label: 'Weigh trade-offs fast', persona: 'strategist' },
      { id: 'q2-3', label: 'Trust what feels aligned', persona: 'navigator' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Feedback you crave most?',
    choices: [
      { id: 'q3-1', label: 'What signals I spotted or missed', persona: 'seer' },
      { id: 'q3-2', label: 'Decision quality over time', persona: 'strategist' },
      { id: 'q3-3', label: 'How choices impact people', persona: 'navigator' },
    ],
  },
  {
    id: 'q4',
    prompt: 'In a new domain you typically…',
    choices: [
      { id: 'q4-1', label: 'Play with ideas until patterns pop', persona: 'seer' },
      { id: 'q4-2', label: 'Model the landscape quickly', persona: 'strategist' },
      { id: 'q4-3', label: 'Mirror experts and adapt fast', persona: 'navigator' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Your secret intuition superpower is…',
    choices: [
      { id: 'q5-1', label: 'Creative association', persona: 'seer' },
      { id: 'q5-2', label: 'Scenario navigation', persona: 'strategist' },
      { id: 'q5-3', label: 'Reading people & timing', persona: 'navigator' },
    ],
  },
  {
    id: 'q6',
    prompt: 'What do you want more of from this app?',
    choices: [
      { id: 'q6-1', label: 'Wildcard thinking drills', persona: 'seer' },
      { id: 'q6-2', label: 'Strategic reps with pressure', persona: 'strategist' },
      { id: 'q6-3', label: 'Confidence in live moments', persona: 'navigator' },
    ],
  },
];

export const personaCopy: Record<
  PersonaKey,
  { title: string; subtitle: string; focus: string[] }
> = {
  seer: {
    title: 'The Vision Seer',
    subtitle: 'Your gift is spotting bold patterns before they solidify.',
    focus: [
      'Double down on creative leaps',
      'Sharpen anomaly detection',
      'Ground insights with quick validation loops',
    ],
  },
  strategist: {
    title: 'The Strategic Navigator',
    subtitle: 'You orchestrate moving parts and choose pathways under pressure.',
    focus: [
      'Strengthen scenario instincts',
      'Speed up confident trade-offs',
      'Track win-rate with closing feedback',
    ],
  },
  navigator: {
    title: 'The Intuitive Guide',
    subtitle: 'You read moments and people with uncanny timing.',
    focus: [
      'Calibrate gut signals daily',
      'Expand signal library with micro-games',
      'Stretch intuition to new contexts',
    ],
  },
};

type ScoreBucket = Record<PersonaKey, number>;

export function derivePersona(
  quizSelections: Record<string, PersonaKey>,
  reflectionId: string | null = null,
): PersonaKey {
  const scores: ScoreBucket = {
    seer: 0,
    strategist: 0,
    navigator: 0,
  };

  const reflectionPersona = reflectionOptions.find(
    (option) => option.id === reflectionId,
  )?.persona;
  if (reflectionPersona) {
    scores[reflectionPersona] += 2;
  }

  Object.values(quizSelections).forEach((persona) => {
    scores[persona] += 1;
  });

  return (Object.keys(scores) as PersonaKey[]).reduce((top, key) =>
    scores[key] > scores[top] ? key : top,
  );
}
