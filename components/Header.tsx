import { ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

type Header = {
  leftNode?: ReactNode;
  title: string;
};
const Header = ({ title }: Header) => {
  const router = useRouter();
  return (
    <View className=" py-[12px]  relative px-[14px] flex-row items-center">
      <Pressable
        className="absolute left-0"
        onPress={() => {
          router.back();
        }}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </Pressable>
      <View className="mx-auto">
        <Text className="text-[18px] font-bold">{title}</Text>
      </View>
    </View>
  );
};
export default Header;
