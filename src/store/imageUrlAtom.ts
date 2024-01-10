import { atom } from 'jotai';

interface ImageUrl {
  profileImageUrl?: string;
  imageUrl?: string;
}

export const ImageUrlAtom = atom<ImageUrl>({});
