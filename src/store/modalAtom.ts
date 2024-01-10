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

// 모달을 열기 위한 함수
export const openModal = atom(null, (get, set, name: string) => {
  const state = get(ModalAtom);
  if (!state.openName.includes(name)) {
    set(ModalAtom, { ...state, openName: [...state.openName, name] });
  }
});

// 모달을 닫기 위한 함수
export const closeModal = atom(null, (get, set, name: string) => {
  const state = get(ModalAtom);

  set(ModalAtom, {
    ...state,
    openName: state.openName.filter((n) => n !== name),
  });
});

// 모든 모달을 닫기 위한 함수
export const closeAllModals = atom(null, (get, set) => {
  set(ModalAtom, { openName: [] });
});
