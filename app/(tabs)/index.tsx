import { Image, ScrollView, Text, View, Dimensions, Pressable } from 'react-native';

import { useContext } from 'react';
import { MeContext } from '@/Contexts/MeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, PageBg } from '@/components';
import AddFriendModal from '@/components/AddFriendModal';

const ClientHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const [me] = useContext(MeContext);

  return (
    <View className="bg-[#fff]" style={{ paddingTop: top, height: ClientHeight }}>
      <PageBg />
      <View className="h-[50px] px-[12px] flex-row items-center">
        <View className=" absolute left-[12px] flex-row">
          {me.avatar && (
            <Image source={{ uri: me.avatar }} className="w-[40px] h-[40px] rounded-[20px]" />
          )}
        </View>
        <Text className="flex-1 text-center text-[16px] font-bold">聊天列表</Text>
        <AddFriendModal containerClassName="absolute right-[16px] w-[20px] h-[20px] ">
          <View className="w-[20px] h-[2px] bg-black rounded-[2px] absolute top-[8px]" />
          <View className="w-[20px] h-[2px] bg-black rounded-[2px] absolute  top-[8px] rotate-90" />
        </AddFriendModal>
      </View>

      <View className="px-[16px] py-[16px]"></View>
    </View>
  );
}
