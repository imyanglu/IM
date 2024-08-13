import { atom } from 'jotai';

export type Friend = {
  id: string;
  avatar: string;
  nickname: string;
};

export const FriendListAtom = atom<Friend[]>([]);
