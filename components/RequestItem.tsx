import { MeContext } from '@/Contexts/MeContext';
import { FriendRequestSchema, UserOverviewSchema } from '@/database/init';
import { getUser } from '@/database/models/user';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { Image } from 'expo-image';

import { useLast } from '@/hooks/useLast';

const RequestItem = ({
  senderId,
  receiverId,
  status,
  addFriend,
}: FriendRequestSchema & { addFriend: (id: string) => void }) => {
  const [me] = useContext(MeContext);
  const [user, setUser] = useState<UserOverviewSchema>();
  const sendByMe = me.id === senderId;
  const queryUser = async () => {
    const desId = sendByMe ? receiverId : senderId;
    const user = await getUser(desId);
    if (user) setUser(user);
  };
  const addFriendRef = useLast(addFriend);

  const funBtn = useMemo(() => {
    const sendByMe = me.id === senderId;
    console.log(sendByMe);
    if (status === '0') {
      if (sendByMe) return <Text className="text-[#a5a4a4]">等待验证</Text>;
      return (
        <Pressable
          onPress={() => {
            addFriendRef.current(receiverId);
          }}
          className="bg-[#0ECA74] px-[12px] py-[8px] rounded-md">
          <Text className="text-[#fff]">添加</Text>
        </Pressable>
      );
    }
    return <Text className="text-[#a5a4a4]">已添加</Text>;
  }, [me, senderId, addFriendRef, status]);

  useEffect(() => {
    queryUser();
  }, [receiverId, senderId]);

  if (!user) return <></>;
  return (
    <Pressable className="px-[12px] bg-[#fff] flex-row h-[70px] items-center ">
      <View>
        <Image source={{ uri: user.avatar }} className="w-[50px] h-[50px] rounded-[4px]" />
      </View>
      <View className="flex-1 border-b-[1px] ml-[12px] h-full flex-row items-center border-b-[#EDEDED]">
        <Text className=" text-[19px]" numberOfLines={1}>
          {user?.nickname}
        </Text>
      </View>
      <View className="w-fit">{funBtn}</View>
    </Pressable>
  );
};
export default RequestItem;
