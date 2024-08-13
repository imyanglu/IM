import { Header, PageBg } from '@/components';
import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from 'react';
import { MeContext } from '@/Contexts/MeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Links = [
  {
    title: '扫一扫',
    key: 'scan',
    desc: '扫描二维码名片',
    icon: (
      <View className="bg-[#1485EF] w-[40px] h-[40px] justify-center items-center rounded-[4px] ml-[12px]">
        <AntDesign name="scan1" size={24} color="white" />
      </View>
    ),
  },
];

const Page = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [me] = useContext(MeContext);
  const gotoAdd = () => {
    router.push('./add');
  };
  return (
    <View className="flex-1 bg-[#EDEDED]" style={{ paddingTop: top }}>
      <PageBg />
      <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} />
      <Header title="添加朋友" />

      <Pressable onPress={gotoAdd} className="flex-row w-full items-center px-[12px] mt-[12px]">
        <View className="bg-[#fff] flex-1 py-[6px] rounded-[4px] flex-row justify-center items-center">
          <AntDesign name="search1" size={16} color="#9d9a9a" />
          <Text className="text-center  text-[#9d9a9a] ml-[6px]">邮箱/用户名</Text>
        </View>
      </Pressable>

      <View className="flex-row justify-center items-center mt-[12px]">
        <Text className="text-center  text-[#6d6b6b]">我的邮箱 : </Text>
        <View className="max-w-[150px] w-fit  items-center">
          <Text className="text-[#6d6b6b] w-full" ellipsizeMode="middle" numberOfLines={1}>
            {me.email}
          </Text>
        </View>
        <Pressable className="ml-[4px]">
          <FontAwesome name="qrcode" size={22} color="#6d6b6b" />
        </Pressable>
      </View>
      <View className=" pt-[40px]">
        {Links.map((i) => (
          <Pressable key={i.key} className="py-[8px] flex-row bg-[#fff]">
            <View className="w-fit">{i.icon}</View>
            <View className="ml-[12px] justify-between">
              <Text className="font-bold text-[16px]">{i.title}</Text>
              <Text className="text-[12px] text-[#a29f9f]">{i.desc}</Text>
            </View>
            <View className="ml-auto justify-center items-center pr-[12px]">
              <AntDesign name="right" size={18} color="#6d6b6b" />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
export default Page;
