import { queryAvatars } from '@/api';
import { useEffect, useState } from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import AvatarSelectModal from './AvatarSelectModal';

const AvatarSection = ({ avatars, avatar }: { avatars?: string[]; avatar?: string }) => {
  return (
    <View className="w-[100px] h-[100px] bg-[#ccc] rounded-[50px] mx-auto relative">
      <Image source={{ uri: avatar }} className="w-full h-full rounded-[50px] " />
      <Pressable
        className="w-full h-full justify-center items-center absolute top-0 left-0 bg-[#00000030] rounded-[50px] "
        onPress={() => {}}>
        <Text className="text-[#f9f7f7] font-bold ">点击修改</Text>
      </Pressable>
      <AvatarSelectModal avatars={avatars ?? []} />
    </View>
  );
};
export default AvatarSection;
