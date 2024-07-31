import { get } from './instance';

export const getEmailCode = (email: string) => {
  return get('/getCode', { email });
};

export const verifyEmailCode = <T>({ email, code }: { email: string; code: string }) => {
  return get<T>('/verifyCode', { email, code });
};
export const queryAvatars = () => {
  return get<{ avatars: string[] }>('/avatars');
};
