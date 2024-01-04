import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const DEFAULT_INFINITE_SCROLL_STATE = {
  scrollPosition: 0,
  loadedData: [],
};

const infiniteScrollAtom = atomWithStorage<any>(
  'infiniteScrollState',
  DEFAULT_INFINITE_SCROLL_STATE,
);

export const updateInfiniteScrollState = atom(
  (get) => get(infiniteScrollAtom),
  (get, set, update: Partial<any>) => {
    const currentScrollState = get(infiniteScrollAtom);
    const updatedScrollState = { ...currentScrollState, ...update };
    set(infiniteScrollAtom, updatedScrollState);
  },
);
