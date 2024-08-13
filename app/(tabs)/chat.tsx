import { Friend, FriendListAtom } from '@/atoms/friendsListAtom';
import { Header, PageBg } from '@/components';
import { useAtom } from 'jotai';
import { Pressable, View, Text, SectionList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode, useCallback, useMemo } from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { pySegSort } from '@/utils';
import { router } from 'expo-router';

const SystemChat = [
  {
    key: 'newFriend',
    renderItem: () => {
      return (
        <Pressable
          onPress={() => {
            router.push('/friendRequest');
          }}
          className="px-[12px] bg-[#fff] flex-row h-[70px] items-center ">
          <View className="w-[48px] bg-[#FA9E3B] justify-center items-center h-[48px] rounded-[4px]">
            <Octicons name="person-add" size={26} color="#fff" />
          </View>
          <View className="flex-1 border-b-[1px] ml-[12px] h-full flex-row items-center border-b-[#EDEDED]">
            <Text className=" text-[18px]" numberOfLines={1}>
              新的朋友
            </Text>
          </View>
        </Pressable>
      );
    },
  },
  {
    key: 'sse',
    renderItem: () => {
      return (
        <Pressable className="px-[12px] bg-[#fff] flex-row h-[70px] items-center ">
          <View className="w-[48px] bg-[#2A6BF2] justify-center items-center h-[48px] rounded-[4px]">
            <MaterialIcons name="announcement" size={22} color="#fff" />
          </View>
          <View className="flex-1 border-b-[1px] ml-[12px] h-full flex-row items-center border-b-[#EDEDED]">
            <Text className=" text-[18px]" numberOfLines={1}>
              系统通知
            </Text>
          </View>
        </Pressable>
      );
    },
  },
];

const Chat = () => {
  const { top } = useSafeAreaInsets();
  const [friends] = useAtom(FriendListAtom);
  const processList = useMemo(() => {
    return pySegSort(friends, (i) => i.nickname) ?? [];
  }, [friends]);
  console.log(processList);

  const renderItem = useCallback(
    ({ item }: { item: Friend }) => {
      const user = item as Friend;
      return (
        <Pressable className="px-[12px] bg-[#fff] flex-row h-[70px] items-center ">
          <View>
            <Image source={{ uri: user.avatar }} className="w-[50px] h-[50px] rounded-[4px]" />
          </View>
          <View className="flex-1 border-b-[1px] ml-[12px] h-full flex-row items-center border-b-[#EDEDED]">
            <Text className=" text-[19px]" numberOfLines={1}>
              {user.nickname}
            </Text>
          </View>
        </Pressable>
      );
    },
    [friends]
  );
  return (
    <View className="bg-[#EDEDED] flex-1" style={{ paddingTop: top }}>
      <PageBg />
      <Header hideBack title="通讯录" />
      <SectionList
        ListHeaderComponent={<>{SystemChat.map((item) => item.renderItem())}</>}
        sections={processList ?? []}
        renderItem={renderItem}
        renderSectionHeader={({ section: { letter } }) => {
          if (letter)
            return (
              <View className="bg-[#EDEDED] px-[12px] py-[4px]">
                <Text>{letter}</Text>
              </View>
            );
          return <></>;
        }}
      />
    </View>
  );
};
export default Chat;
