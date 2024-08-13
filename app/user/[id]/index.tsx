import { Header } from '@/components';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    id: string;
    nickname: string;
    avatar: string;
    bio: string;
    email: string;
    src: string;
    isFriend: string;
  }>();
  const router = useRouter();
  const isFriend = JSON.parse(params.isFriend || 'false');
  const addFriend = () => {
    router.push('./apply');
  };

  return (
    <View className="flex-1 relative bg-[#fff]" style={{ paddingTop: top }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="" />
      <View className="mt-[12px] mb-[24px] flex-row px-[12px]">
        <View className="w-[80px] h-[80px] bg-[#ccc]">
          {params.avatar && (
            <Image source={{ uri: params.avatar }} className="w-full h-full rounded-[4px]" />
          )}
        </View>
        <View className="ml-[16px] flex-start">
          <Text className="text-[24px] font-bold">{params.nickname}</Text>
          <Text className="mt-[8px] text-[#979393]">📮邮箱:{params.email}</Text>
        </View>
      </View>
      <View className="h-[20px] bg-[#EDEDED]" />
      <View className="h-[60px] flex-row items-center px-[12px]">
        <Text className=" text-[17px] w-[70px]">个性签名</Text>
        <View className="flex-1">
          <Text className="ml-[12px] text-[#979393]" ellipsizeMode="tail" numberOfLines={2}>
            {params.bio ? params.bio : '这个人很懒，什么都没有留下.'}
          </Text>
        </View>
      </View>
      <View className="h-[1px] bg-[#EDEDED] mx-[12px]" />
      <View className="h-[60px] flex-row items-center px-[12px]">
        <Text className=" text-[17px] w-[70px]">来源</Text>
        <View className="flex-1">
          <Text className="ml-[12px] text-[#979393]" ellipsizeMode="tail" numberOfLines={2}>
            {params.src || '昵称搜索'}
          </Text>
        </View>
      </View>
      <View className="h-[20px] bg-[#EDEDED]" />
      <Pressable
        className="bg-[#fff] justify-center items-center h-[60px]"
        onPress={isFriend ? () => {} : addFriend}>
        <Text className="text-[19px] text-[#10CB74] font-bold">
          {isFriend ? '发送信息' : '添加好友'}
        </Text>
      </Pressable>
      <View className="flex-1 bg-[#EDEDED]" />
    </View>
  );
};
export default Page;
