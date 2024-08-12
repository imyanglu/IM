import { User } from '@/type';
import AvatarSection from './AvatarSection';
import BasicInfoSection from './BasicInfoSection';
import BioSection from './BioSection';
import Separator from './Separator';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { queryAvatars, setup } from '@/api';
import { ApiError } from '@/api/instance';
import Toast from 'react-native-toast-message';
import { MeContext } from '@/Contexts/MeContext';

export type SetupUser = {
  avatar: string;
  nickname: string;
  age: number;
  gender: number;
  bio: string;
};

const DefaultUser: SetupUser = {
  avatar: '',
  nickname: '',
  age: 18,
  bio: '',
  gender: 0,
};

const windowHeight = Dimensions.get('window').height;

const SetupScreen = () => {
  const [_, changeMe] = useContext(MeContext);
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [user, setUser] = useState<SetupUser>(DefaultUser);
  function changeUser<T extends keyof SetupUser>(key: T, value: SetupUser[T]) {
    setUser((u) => ({ ...u, [key]: value }));
  }
  const isVerify = useMemo(() => {
    return user.nickname;
  }, [user]);

  const initAvatars = async () => {
    const res = await queryAvatars();
    setAvatars(res.avatars);
    changeUser('avatar', res.avatars[0]);
  };

  const submit = async () => {
    setup(user)
      .then((data) => {
        changeMe(data.user);
        router.replace('/');
      })
      .catch((e) => {
        if (e instanceof ApiError) {
          console.log(e, 'ee');
          Toast.show({ type: 'error', text1: e.message });
        }
      });
  };

  useEffect(() => {
    initAvatars();
  }, []);

  return (
    <View className="h-full bg-[#fff]">
      <ScrollView
        className="px-[16px] "
        contentContainerStyle={{ paddingTop: top, minHeight: windowHeight }}>
        <View className=" flex-row w-full items-end mb-[20px]">
          <Text className="color-[#4e7282] text-[24px]">资料设置</Text>
          <Text className="color-[#888] text-[12px] ml-[20px]">轻触或点击修改相关信息哦~</Text>
          <Pressable
            onPress={submit}
            className="ml-auto px-[16px] py-[4px] rounded-[8px]"
            style={{ backgroundColor: isVerify ? '#0ECA74' : '#ccc' }}>
            <Text className="text-[#fff]">提交</Text>
          </Pressable>
        </View>
        <Separator />
        <AvatarSection
          avatars={avatars}
          avatar={user.avatar}
          onChangeAvatar={(avatar) => {
            changeUser('avatar', avatar);
          }}
        />
        <BasicInfoSection {...user} handleChangeUser={changeUser} />
        <BioSection bio={user.bio} handleChangeUser={changeUser} />
      </ScrollView>
    </View>
  );
};

export default SetupScreen;
