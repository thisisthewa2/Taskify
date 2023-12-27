import { atom } from 'jotai';

interface Column {
  newColumn?: string;
}

export const ColumnsAtom = atom<Column>({});
