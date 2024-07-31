import { SetupUser } from './SetupScreen';
import SideTag from './Sidertag';

import { View, Text, TextInput } from 'react-native';

type BioSectionProps = {
  bio: string;
  handleChangeUser<T extends keyof SetupUser>(key: T, value: SetupUser[T]): void;
};

const BioSection = ({ bio, handleChangeUser }: BioSectionProps) => {
  return (
    <View className="pt-[24px] flex-1 w-full">
      <SideTag label="自我介绍" />
      <View className="absolute top-0 bottom-0 bg-[#4e7282] w-[1px] left-[16px] " />

      <View className="w-full px-[32px] py-[16px]   justify-center  pt-[20px]">
        <Text className="text-[20px] font-bold mx-auto">个人说明</Text>
        <TextInput
          value={bio}
          onChangeText={(str) => {
            handleChangeUser('bio', str);
          }}
          multiline
          className="min-h-[80px] my-[16px]"
          textAlignVertical="top"
          placeholder="这个人很懒什么都没留下"
        />
      </View>
      <View></View>
    </View>
  );
};

export default BioSection;
