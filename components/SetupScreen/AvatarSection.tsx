import AvatarPicker from './AvatarPicker';
import SideTag from './Sidertag';
import { Image } from 'expo-image';
import { View } from 'react-native';

type AvatarSectionProps = {
  avatar: string;
  avatars: string[];
  onChangeAvatar(a: string): void;
};

const AvatarSection = ({ avatar, avatars, onChangeAvatar }: AvatarSectionProps) => {
  return (
    <View className="relative py-[24px]">
      <View className="absolute  top-0 bottom-0 bg-[#4e7282] w-[1px] left-[16px] " />
      <SideTag label="头像信息" />
      <View className="px-[32px]  flex-row flex-wrap justify-center gap-x-[16px] pt-[20px]">
        <AvatarPicker avatars={avatars} avatar={avatar} onAVatarChange={onChangeAvatar}>
          <View className="w-[100px] h-[100px] rounded-[50px] bg-[#888]">
            <Image className="w-full h-full rounded-[50px] bg-[#888]" source={{ uri: avatar }} />
          </View>
        </AvatarPicker>
      </View>
    </View>
  );
};

export default AvatarSection;
