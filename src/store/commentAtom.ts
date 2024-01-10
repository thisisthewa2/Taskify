import { atom } from 'jotai';

interface commentInitType {
  comment: string;
}

const commentInit: commentInitType = {
  comment: '',
};

export const CommentAtom = atom(
  (get) => get(commentState),
  (get, set, update: commentInitType) => {
    set(commentState, { ...get(commentState), ...update });
  },
);

const commentState = atom(commentInit);
