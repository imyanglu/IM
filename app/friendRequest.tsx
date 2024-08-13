import { Header, PageBg } from '@/components';
import { Stack, useRouter } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1" style={{ paddingTop: top }}>
      <PageBg />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header title="新的朋友" />
      <Pressable
        onPress={() => {
          router.push('/chat/search/add');
        }}
        className="flex-row w-full items-center px-[12px] mt-[12px]">
        <View className="bg-[#fff] flex-1 py-[6px] rounded-[4px] flex-row justify-center items-center">
          <AntDesign name="search1" size={16} color="#9d9a9a" />
          <Text className="text-center  text-[#9d9a9a] ml-[6px]">邮箱/用户名</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default Page;
