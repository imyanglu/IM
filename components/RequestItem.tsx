import { MeContext } from '@/Contexts/MeContext';
import { FriendRequestSchema } from '@/database/init';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';

const RequestItem = ({ senderId, receiverId }: FriendRequestSchema) => {
  const [me] = useContext(MeContext);
  useEffect(() => {}, [receiverId, senderId]);
  return <View className="flex-row items-center"></View>;
};
export default RequestItem;
