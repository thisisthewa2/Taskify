import { atom } from 'jotai';

interface CardStateType {
  isCreateCard: boolean;
}

const cardStateInit: CardStateType = {
    isCreateCard: false,
};

export const CardStateAtom = atom(
  (get) => get(cardState),
  (get, set, update: CardStateType) => {
    set(cardState, { ...get(cardState), ...update });
  },
);

const cardState = atom(cardStateInit);
