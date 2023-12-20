import { atom } from 'jotai';

interface LoginInfo {
  isLoggedIn?: boolean;
  id?: number;
  email?: string;
  nickname?: string;
  profileImageUrl?: string;
}

export const loginInfoAtom = atom<LoginInfo>({
  isLoggedIn: false,
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
});

export const loginAtom = atom(
  (get) => get(loginInfoAtom),
  (get, set, update: LoginInfo) =>
    set(loginInfoAtom, { ...get(loginInfoAtom), ...update }),
);
