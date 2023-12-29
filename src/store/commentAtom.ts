import { atom } from 'jotai';

interface commentInitType {
  comment: string;
}

const commentInit: commentInitType = {
  comment: '',
};

export const ColumnsAtom = atom(
  (get) => get(commentState),
  (get, set, update: commentInitType) => {
    set(commentState, { ...get(commentState), ...update });
  },
);

const commentState = atom(commentInit);
