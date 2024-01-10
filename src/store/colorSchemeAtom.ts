import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Theme = 'light' | 'dark';

const colorSchemeAtom = atomWithStorage<Theme>('theme', 'light');

export const themeAtom = atom(
  (get) => get(colorSchemeAtom),
  (get, set) => {
    if (get(colorSchemeAtom) === 'light') return set(colorSchemeAtom, 'dark');
    else return set(colorSchemeAtom, 'light');
  },
);
