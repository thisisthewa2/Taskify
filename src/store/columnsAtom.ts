import { atom } from 'jotai';

interface Column {
  columnTitle: string;
}

const columnInit: Column = {
  columnTitle: '',
};

export const ColumnsAtom = atom(
  (get) => get(columnState),
  (get, set, update: Column) => {
    set(columnState, { ...get(columnState), ...update });
  },
);

const columnState = atom(columnInit);
