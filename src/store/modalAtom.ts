import { atom } from 'jotai';

interface Modal {
  openName: string[];
}

const ModalInit: Modal = {
  openName: [],
};

export const ModalAtom = atom(
  (get) => get(modalName),
  (get, set, update: Modal) => {
    set(modalName, { ...get(modalName), ...update });
  },
);

const modalName = atom(ModalInit);
