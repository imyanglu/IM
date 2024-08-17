import { PageBg } from '@/components';
import { MeContext } from '@/Contexts/MeContext';
import { Image } from 'expo-image';
import { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const [me] = useContext(MeContext);
  const { top } = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-[#fff]  relative" style={{ paddingTop: top }}>
      <PageBg />
      <View className="pt-[40px] pb-[30px] flex-row px-[16px]">
        {me.avatar && (
          <Image
            source={{ uri: me.avatar }}
            className="w-[60px] h-[60px] rounded-[8px]  bg-slate-400"
          />
        )}
        <View className="flex-1 ml-[16px] justify-between py-[3px]">
          <Text className="font-bold text-[18px]">{me.nickname}</Text>
          <Text className="text-[13px] text-[#858383]">邮箱:{me.email}</Text>
        </View>
        <View className=" flex-row items-end justify-end">
          <Pressable>
            <Ionicons name="qr-code-sharp" size={16} color="#858383" />
          </Pressable>
          <Pressable className="ml-[20px]">
            <AntDesign name="right" size={16} color="#858383" />
          </Pressable>
        </View>
      </View>
      <View className="bg-[#EDEDED] h-[12px]" />
      <View className="h-[65px] flex-row bg-white items-center px-[16px]">
        <MaterialCommunityIcons name="van-utility" size={30} color="#24C873" />
        <Text className="ml-[16px] text-[17px]">工具箱</Text>
        <Pressable className="ml-auto">
          <AntDesign name="right" size={16} color="#858383" />
        </Pressable>
      </View>
      <View className="bg-[#EDEDED] h-[12px]" />
      <View className="h-[65px] flex-row bg-white items-center px-[16px]">
        <AntDesign name="setting" size={24} color="#98C9F7" />
        <Text className="ml-[16px] text-[17px]">设置</Text>
        <Pressable className="ml-auto">
          <AntDesign name="right" size={16} color="#858383" />
        </Pressable>
      </View>

      <View className="bg-[#EDEDED] flex-1" />
    </View>
  );
};
export default Profile;
