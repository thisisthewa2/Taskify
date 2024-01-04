import { atom } from 'jotai';
import { CardProps } from 'src/types';

const initialValues = {
  id: 0,
  title: '',
  description: '',
  tags: [],
  dueDate: '',
  assignee: {
    profileImageUrl: '',
    nickname: '',
    id: 0,
  },
  imageUrl: '',
  teamId: '',
  columnId: 0,
  createdAt: '',
  updatedAt: '',
  dashboardId: 0,
};
export const cardAtom = atom<CardProps>(initialValues);
