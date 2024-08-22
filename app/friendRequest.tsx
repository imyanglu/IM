import { Header, PageBg } from '@/components';
import { Stack, useRouter } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext, useEffect, useState } from 'react';
import { getFriendRequests, updateFriendRequestStatus } from '@/database/models/friend';
import { MeContext } from '@/Contexts/MeContext';
import { FlashList } from '@shopify/flash-list';
import { FriendRequestSchema } from '@/database/init';
import RequestItem from '@/components/RequestItem';
import { acceptFriendReq } from '@/api';
import Toast from 'react-native-toast-message';

const Page = () => {
  const [me] = useContext(MeContext);
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [requests, setRequests] = useState<FriendRequestSchema[]>([]);
  const initRequests = async () => {
    const requests = await getFriendRequests(me.id);
    setRequests(requests);
  };
  const addFriend = async (id: string) => {
    try {
      await acceptFriendReq(id);
      setRequests((r) =>
        r.map((item) => {
          if (item.receiverId === id) {
            console.log(item);
            return { ...item, status: '1' };
          }
          return item;
        })
      );
      updateFriendRequestStatus([{ sId: id, rId: me.id, status: '1' }]);
    } catch (err) {
      Toast.show({ type: 'error', text1: '添加失败' });
    }
  };
  console.log(requests);
  useEffect(() => {
    initRequests();
  }, []);

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
        className=" flex-row w-full items-center px-[12px] mt-[12px] mb-[24px]">
        <View className="bg-[#fff] flex-1 py-[6px] rounded-[4px] flex-row justify-center items-center">
          <AntDesign name="search1" size={16} color="#9d9a9a" />
          <Text className="text-center  text-[#9d9a9a] ml-[6px]">邮箱/用户名</Text>
        </View>
      </Pressable>
      <FlashList
        extraData={[requests]}
        estimatedItemSize={80}
        data={requests}
        renderItem={({ item }) => {
          return <RequestItem {...item} addFriend={addFriend} />;
        }}
      />
    </View>
  );
};
export default Page;
