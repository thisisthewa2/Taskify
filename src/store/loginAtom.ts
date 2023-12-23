import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface LoginInfo {
  isLoggedIn?: boolean;
  id?: number;
  email?: string;
  nickname?: string;
  profileImageUrl?: string;
}

const DEFAULT_LOGIN_INFO = {
  isLoggedIn: false,
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
};

const loginInfoAtom = atomWithStorage<LoginInfo>(
  'loginInfo',
  DEFAULT_LOGIN_INFO,
);

export const loginAtom = atom(
  (get) => get(loginInfoAtom),
  (get, set, update: LoginInfo) => {
    if (update.isLoggedIn === false) {
      return set(loginInfoAtom, DEFAULT_LOGIN_INFO);
    }
    return set(loginInfoAtom, {
      ...get(loginInfoAtom),
      ...update,
      isLoggedIn: true,
    });
  },
);
