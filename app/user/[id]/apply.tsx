import { addFriendToList } from '@/api';
import { Header } from '@/components';
import { MeContext } from '@/Contexts/MeContext';
import { addFriendRequest } from '@/database/models/friend';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [me] = useContext(MeContext);
  const [value, setValue] = useState('');
  const addFriend = async () => {
    if (!id) return;
    try {
      await addFriendToList(id, value);
      await addFriendRequest({ senderId: me.id, receiverId: id, reason: value });
      Toast.show({ type: 'success', text1: '发送好友请求成功.' });
    } catch (err) {
      Toast.show({ type: 'error', text1: '添加失败,请稍后再试.' });
      console.log(err);
    } finally {
      router.back();
    }
  };
  return (
    <View className="flex-1 bg-[#fff] px-[12px]" style={{ paddingTop: top }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="申请添加朋友" />
      <Text></Text>
      <TextInput
        className="bg-[#F7F7F7] px-[12px] pt-[12px] pb-[4px] rounded-[4px]"
        numberOfLines={4}
        multiline
        value={value}
        onChangeText={setValue}
        textAlignVertical="top"
        placeholder="备注..."
        maxLength={200}
      />
      <Pressable
        className="bg-[#07C060] w-[100px] justify-center items-center h-[50px] mx-auto mt-[24px] rounded-[4px]"
        onPress={addFriend}>
        <Text className="text-[#fff] font-bold text-[16px]">发送</Text>
      </Pressable>
    </View>
  );
};
export default Page;
