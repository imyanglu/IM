import { View, Text, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useContext, useEffect, useRef } from 'react';
import { MeContext } from '@/Contexts/MeContext';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { base64ToFile } from '@/utils';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [me] = useContext(MeContext);
  const svgRef = useRef<{ toDataURL: (cn: (d: string) => void) => void }>();
  const saveQRcodeImg = async (data: string) => {
    const fileUri = FileSystem.cacheDirectory + 'qrcode.jpg';
    try {
      await base64ToFile({ base64: data, uri: fileUri });
      Toast.show({ type: 'success', text1: '保存成功' });
    } catch (err) {
      console.log(err);
    }
  };
  const getBase64 = () => {
    svgRef.current!.toDataURL(saveQRcodeImg);
  };

  useEffect(() => {}, []);
  return (
    <View className="flex-1 bg-[#E88F71]  items-center" style={{ paddingTop: top }}>
      <Header title="" arrowColor="white" />
      <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} />
      <View className="flex-1 pt-[100px] items-center w-[200px]">
        <View className="flex-row mb-[32px] items-center flex-start">
          {me.avatar && (
            <Image source={{ uri: me.avatar }} className="w-[60px] h-[60px] rounded-[8px]  " />
          )}

          <View className="flex-1 ml-[24px]">
            <Text numberOfLines={2} className="font-bold text-[20px] text-[#fff]">
              {me.nickname}
            </Text>
          </View>
        </View>
        <QRCode
          getRef={(c) => {
            svgRef.current = c;
          }}
          value={me.id}
          color="white"
          backgroundColor="transparent"
          logo={require('@/assets/images/icon.png')}
          logoSize={50}
          size={200}
          logoBackgroundColor="transparent"
        />
        <Text className="text-[#ffffff80] mt-[12px]">扫一扫上方二维码加我为好友.</Text>
      </View>
      <View className="w-[200px] flex-row h-[100px] justify-between">
        <Pressable>
          <Text className="text-[#fff] font-bold text-[16px]">扫一扫</Text>
        </Pressable>
        <Pressable onPress={getBase64}>
          <Text className="text-[#fff] font-bold text-[16px]">保存图片</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Page;
