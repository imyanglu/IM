import { SetupUser } from './SetupScreen';
import SideTag from './Sidertag';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput } from 'react-native';

type BasicInfoSectionProps = {
  nickname: string;
  age: number | null | string;
  handleChangeUser<T extends keyof SetupUser>(key: T, value: SetupUser[T]): void;
};

const BasicInfoSection = ({ nickname, age, handleChangeUser }: BasicInfoSectionProps) => {
  const params = useLocalSearchParams<{ email: string }>();
  return (
    <View className="">
      <SideTag label="基本信息" />
      <View className="absolute h-full bg-[#4e7282] w-[1px] left-[16px] " />
      <View className="px-[32px] pt-[16px] flex-row flex-wrap gap-y-[8px]">
        <View className="flex-row items-center gap-x-[6px] basis-[100%]">
          <Text>昵&nbsp;&nbsp;&nbsp;&nbsp;称</Text>
          <TextInput
            className="bg-[#fff] h-full text-[12px]"
            placeholder="昵称 (必填)"
            value={nickname}
            onChangeText={(str) => {
              handleChangeUser('nickname', str);
            }}
          />
        </View>
        <View className="flex-row items-center gap-x-[6px] basis-[50%]">
          <Text>年&nbsp;&nbsp;&nbsp;&nbsp;龄</Text>
          <TextInput
            className="bg-[#fff] h-full text-[12px]"
            placeholder="年龄"
            keyboardType="numeric"
            value={(age ?? '') + ''}
            onChangeText={(age) => {
              const ageN = age.replace(/[^0-9]/g, '');
            }}
          />
        </View>

        <View className="flex-row items-center gap-x-[6px] basis-[100%]">
          <Text>邮&nbsp;&nbsp;&nbsp;&nbsp;箱</Text>
          <Text className="bg-[#fff]  text-[12px] justify-center items-center">
            {params?.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BasicInfoSection;
