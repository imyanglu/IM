import { User } from '@/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Storage = {
  lastRequestPostTime: number;
  me: User;
  lastRequestMyPostTime: number;
  lastRequestEssayTimeStr: string;
};

const save = async <T extends keyof Storage>(key: T, value: Storage[T] | null) => {
  try {
    await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const get = async <T extends keyof Storage>(k: T): Promise<Storage[T] | null> => {
  const jsonValue = await AsyncStorage.getItem(k);
  try {
    if (jsonValue === null) return null;

    if (['{', '['].includes(jsonValue[0])) return JSON.parse(jsonValue);
    return jsonValue as Storage[T];
  } catch (e) {
    return jsonValue as Storage[T];
    // error reading value
  }
};
const remove = async (k: keyof Storage) => {
  try {
    await AsyncStorage.removeItem(k);
  } catch (e) {
    // remove error
  }
};

export const Storage = {
  save,
  get,
  remove,
};
