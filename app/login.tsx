import { Input } from '@/components';
import PageBg from '@/components/PageBg';
import { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = () => {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const isVerify = email && code;
  return (
    <View className="flex-1 px-[24px] bg-[#fff] relative " style={{ paddingTop: top }}>
      <PageBg />
      <Text className="font-bold text-[32px] mt-[32px] ">登录/注册</Text>
      <Image
        className="w-[80px] h-[80px] mx-auto rounded-[40px] mt-[12px]"
        source={require('@/assets/images/icon.png')}
      />
      <Text className=" mt-[24px] text-[18px] text-center font-bold">🎉 欢迎使用白熊工具。</Text>

      <View className="mt-[40px] flex-row   ">
        <Input
          containerClassName="flex-1"
          label="📮邮箱:"
          value={email}
          onChangeText={(str) => {
            setEmail(str);
          }}
        />
        <Pressable className="ml-[12px] bg-[#11CC75] items-center w-[100px] justify-center rounded-[12px] px-[16px]">
          <Text className="text-[#fff] text-[12px] font-bold">获取验证码</Text>
        </Pressable>
      </View>

      <Input
        containerClassName="mt-[24px]"
        label="验证码"
        value={code}
        onChangeText={(str) => {
          setCode(str);
        }}
      />
      <Pressable
        style={{
          backgroundColor: isVerify ? '#11CC75' : '#ccc',
        }}
        className=" bg-[#11CC75] items-center w-full mt-[24px] h-[50px] mx-auto justify-center rounded-[12px] px-[16px]">
        <Text className="text-[#fff] text-[18px] font-bold">登录</Text>
      </Pressable>
    </View>
  );
};
export default Login;
