import { Image } from 'expo-image';

import { ReactNode, useEffect, useState } from 'react';
import { View, Pressable, Modal, Image as NativeImage, PixelRatio } from 'react-native';

type AvatarPickerProps = {
  children: ReactNode;
  avatar: string;
  avatars: string[];
  onAVatarChange(a: string): void;
};

const AvatarPicker = ({ avatar, children, avatars, onAVatarChange }: AvatarPickerProps) => {
  const [show, setShow] = useState(false);

  const closeClipView = () => {};

  const resizeAvatar = (img: { uri: string; width: number; height: number }) => {
    closeClipView();
  };

  const showImagePicker = () => {};

  return (
    <View className="w-full z-[10] relative">
      <Pressable
        className="mx-auto"
        onPress={() => {
          setShow(true);
        }}>
        {children}
      </Pressable>
      <Modal visible transparent>
        <View className="absolute top-[250px]  w-full flex-row flex-wrap justify-center  z-10 px-[20px]">
          <View
            className="w-full flex-row flex-wrap justify-center bg-[#fff] py-[16px] rounded-[24px]"
            style={{
              rowGap: 16,
              columnGap: 16,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 10,
            }}>
            {avatars?.map((a) => (
              <Pressable
                className="w-[90px] h-[90px]"
                key={a}
                onPress={() => {
                  onAVatarChange(a);
                  setShow(false);
                }}>
                <Image source={{ uri: a }} className="w-[90px] h-[90px] rounded-[45px]" />
                {a === avatar && (
                  <View className="w-[6px] h-[6px] bg-[#24CD77] rounded-[3px] absolute right-0 top-0 z-20" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvatarPicker;
