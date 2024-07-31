const Gender = {
  0: 'other',
  1: 'male',
  2: 'female',
} as const;
export type User = {
  id: string;
  nickname: string;
  avatar: string;
  age: number;
  bio: string;
  email: string;
  gender: number;
  isSetup: boolean;
};
