import { PageBg } from '@/components';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Pressable, View, Text, TextInput, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRef, useState } from 'react';
import { useLast } from '@/hooks/useLast';
import { useDebounce } from '@/hooks/useDebounce';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { queryUser } from '@/api';

const { width, height } = Dimensions.get('window');

const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const showSearchSection = useDebounce(() => {
    setShowSearch(!!value.trim());
  }, 300);

  const searchUser = async () => {
    try {
      const data = await queryUser(value);
      const users = data.users;
      if (users.length === 1) {
        const user = users[0];
        const src = value === user.email ? '邮箱搜索' : '昵称搜索';
        router.push({
          pathname: `/user/${user.id}`,
          params: {
            avatar: user.avatar,
            nickname: user.nickname,
            bio: user.bio,
            email: user.email,
            src,
            isFriend: String(false),
          },
        });
      }
    } catch (err) {
      console.log(err, 'eee');
    }
  };

  return (
    <View className="relative bg-[#EDEDED]" style={{ paddingTop: top, width, height }}>
      <PageBg />
      <Stack.Screen options={{ headerShown: false }} />
      <View className=" px-[16px] flex-row mb-[12px] items-center mt-[12px]">
        <View className="bg-[#fff] flex-row flex-1 py-[2px] rounded-[8px] items-center pr-[12px]">
          <Pressable
            className="px-[8px]"
            onPress={() => {
              return true;
            }}>
            <Fontisto name="search" size={20} color="#EDEDED" />
          </Pressable>
          <TextInput
            value={value}
            placeholder="邮箱/用户名"
            autoFocus
            ref={inputRef}
            className="flex-1"
            onChangeText={(str) => {
              setValue(str);
              if (!str.trim()) setShowSearch(false);
              showSearchSection();
            }}
          />
        </View>
        <Text className="text-[#10CC75] ml-[12px] text-[16px]" onPress={router.back}>
          取消
        </Text>
      </View>
      {showSearch && (
        <Pressable className="bg-[#fff] w-full py-[8px] px-[12px] flex-row" onPress={searchUser}>
          <View className="bg-[#2BA246] w-[50px] rounded-[4px] h-[50px] justify-center items-center">
            <MaterialIcons name="person-add-alt" size={28} color="#fff" />
          </View>
          <View className="flex-row items-center px-[12px] flex-1">
            <View className="w-fit">
              <Text className="text-[17px]">搜索:</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[#2BA246] text-[17px]" ellipsizeMode="tail" numberOfLines={1}>
                {value}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
      <Pressable className="flex-1" onPress={router.back}></Pressable>
    </View>
  );
};

export default Page;
