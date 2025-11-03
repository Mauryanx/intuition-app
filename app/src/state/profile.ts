import { create } from 'zustand';

import type { PersonaKey } from '@/features/onboarding/content';

type PersonaState = {
  persona: PersonaKey | null;
  reflectionId: string | null;
  quizSelections: Record<string, PersonaKey>;
  setPersonaData: (input: {
    persona: PersonaKey;
    reflectionId: string | null;
    quizSelections: Record<string, PersonaKey>;
  }) => void;
  reset: () => void;
};

export const useProfileStore = create<PersonaState>((set) => ({
  persona: null,
  reflectionId: null,
  quizSelections: {},
  setPersonaData: ({ persona, reflectionId, quizSelections }) =>
    set({ persona, reflectionId, quizSelections }),
  reset: () => set({ persona: null, reflectionId: null, quizSelections: {} }),
}));
