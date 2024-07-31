import { User } from '@/type';
import { get, post } from './instance';

export const getEmailCode = (email: string) => {
  return get('/getCode', { email });
};

export const verifyEmailCode = <T>({ email, code }: { email: string; code: string }) => {
  return get<T>('/verifyCode', { email, code });
};

export const queryAvatars = () => {
  return get<{ avatars: string[] }>('/avatars');
};
export const setup = (data: { bio: string; avatar: string; nickname: string; age: number }) => {
  return post<{ message: string; user: User }>('/setup', { data });
};

export const getMe = () => {
  return get<{ user: User }>('/me');
};
