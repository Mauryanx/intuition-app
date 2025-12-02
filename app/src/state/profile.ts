import { create } from 'zustand';

import type { PersonaKey } from '@/features/onboarding/content';

type PersonaState = {
  persona: PersonaKey | null;
  reflectionId: string | null;
  quizSelections: Record<string, PersonaKey>;
  name: string | null;
  age: number | null;
  setPersonaData: (input: {
    persona: PersonaKey;
    reflectionId: string | null;
    quizSelections: Record<string, PersonaKey>;
  }) => void;
  setUserInfo: (input: { name?: string | null; age?: number | null }) => void;
  reset: () => void;
};

export const useProfileStore = create<PersonaState>((set) => ({
  persona: null,
  reflectionId: null,
  quizSelections: {},
  name: null,
  age: null,
  setPersonaData: ({ persona, reflectionId, quizSelections }) =>
    set({ persona, reflectionId, quizSelections }),
  setUserInfo: ({ name, age }) =>
    set((state) => ({
      name: typeof name === 'undefined' ? state.name : name,
      age: typeof age === 'undefined' ? state.age : age,
    })),
  reset: () =>
    set({
      persona: null,
      reflectionId: null,
      quizSelections: {},
      name: null,
      age: null,
    }),
}));
