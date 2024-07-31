import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { nanoid } from 'nanoid/non-secure';

export const getId = async () => {
  const id = await getItemAsync('id');
  if (id) return id;
  const clientId = nanoid();
  await setItemAsync('id', clientId);
  return clientId;
};
