import { Header } from '@/components';
import { Stack } from 'expo-router';
import { Pressable, TextInput, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { top } = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-[#fff] px-[12px]" style={{ paddingTop: top }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="申请添加朋友" />
      <Text></Text>
      <TextInput
        className="bg-[#F7F7F7] px-[12px] pt-[12px] pb-[4px] rounded-[4px]"
        numberOfLines={4}
        multiline
        textAlignVertical="top"
        placeholder="备注..."
        maxLength={200}
      />
      <Pressable className="bg-[#07C060] w-[100px] justify-center items-center h-[50px] mx-auto mt-[24px] rounded-[4px]">
        <Text className="text-[#fff] font-bold text-[16px]">发送</Text>
      </Pressable>
    </View>
  );
};
export default Page;
