import { User } from '@/type';
import { createContext, ReactNode, useState } from 'react';

const DefaultUser: User = {
  id: '',
  nickname: '',
  avatar: '',
  age: 0,
  bio: '',
  email: '',
  gender: 0,
  isSetup: false,
};

type MeContextType = [
  User,
  {
    <K extends keyof User>(k: K, v: User[K]): void;
    <K extends Partial<User>>(k: K): void;
  }
];

export const MeContext = createContext<MeContextType>([DefaultUser, () => {}]);

export const MeProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User>({ ...DefaultUser });
  function changeMe<K extends keyof User>(k: K, v: User[K]): void;
  function changeMe<K extends Partial<User>>(k: K): void;
  function changeMe<K extends keyof User | Partial<User>>(
    k: K,
    v?: K extends keyof User ? User[K] : never
  ) {
    if (typeof k === 'string') {
      setMe((prev) => ({ ...prev, [k]: v }));
    } else {
      setMe((prev) => ({ ...prev, ...k }));
    }
  }

  return <MeContext.Provider value={[me, changeMe]}>{children}</MeContext.Provider>;
};
