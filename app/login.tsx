import { getEmailCode, verifyEmailCode } from '@/api';
import { ApiError } from '@/api/instance';
import { Input } from '@/components';
import CountdownTimer from '@/components/CountdownTimer';
import PageBg from '@/components/PageBg';
import { MeContext } from '@/Contexts/MeContext';
import { User } from '@/type';
import { Storage } from '@/utils/storage';
import { useRouter } from 'expo-router';
import { setItemAsync } from 'expo-secure-store';
import { useContext, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [me, changeMe] = useContext(MeContext);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isTimeDown, setIsTimeDown] = useState(false);

  const getCode = async () => {
    if (!isEmailVerify || isTimeDown) return;
    if (!email) {
      Toast.show({ type: 'error', text1: '📮邮箱错误!' });
      return;
    }
    try {
      const data = await getEmailCode(email);

      setIsTimeDown(true);
      Toast.show({ type: 'info', text1: '📮验证码已发送!' });
    } catch (e) {
      if (e instanceof ApiError) {
        Toast.show({
          type: 'error',
          text1: e.status === 429 ? '接口请求超过限制次数!' : '📮邮箱错误!',
        });
      }
    }
  };

  const verify = async () => {
    if (!code || !email) return;

    try {
      const data = await verifyEmailCode<{ token: string; user: User }>({ email, code });
      if (data.token) setItemAsync('token', data.token);
      if (!data.user.isSetup) {
        changeMe({ email: data.user.email, id: data.user.id });
        router.push({ pathname: '/setup', params: { email: data.user.email } });
        return;
      }
      const me = data.user;
      Storage.save('me', me);
      changeMe(me);
      router.replace('/');
    } catch (e) {
      if (e instanceof ApiError) {
        Toast.show({
          type: 'error',
          text1: e.message,
        });
      }
    }
  };
  const isEmailVerify = EmailRegex.test(email);

  const isVerify = email && code;

  return (
    <View className="flex-1 px-[20px] bg-[#fff] relative " style={{ paddingTop: top }}>
      <PageBg />
      <Text className="font-bold text-[23px] mt-[32px] ">登录/注册</Text>
      <Image
        className="w-[80px] h-[80px] mx-auto rounded-[40px] mt-[40px]"
        source={require('@/assets/images/icon.png')}
      />
      <Text className=" mt-[16px] text-[18px] text-center font-bold">🎉 欢迎使用白熊工具。</Text>

      <View className="mt-[60px] flex-row   ">
        <Input
          containerClassName="flex-1"
          label="📮邮箱:"
          value={email}
          onChangeText={(str) => {
            setEmail(str);
          }}
        />
        <Pressable
          onPress={getCode}
          className="ml-[12px]  items-center w-[100px] justify-center rounded-[12px] px-[16px]"
          style={{
            backgroundColor: isEmailVerify ? '#11CC75' : '#ccc',
          }}>
          {isTimeDown ? (
            <CountdownTimer
              seconds={60}
              onTimeDown={() => {
                setIsTimeDown(false);
              }}
            />
          ) : (
            <Text className="text-[#fff] text-[12px] font-bold">获取验证码</Text>
          )}
        </Pressable>
      </View>

      <View className="flex-row">
        <Input
          containerClassName="mt-[24px] w-[100px]"
          label="验证码"
          value={code}
          onChangeText={(str) => {
            setCode(str);
          }}
        />
        <Pressable
          onPress={verify}
          style={{
            backgroundColor: isVerify ? '#11CC75' : '#ccc',
          }}
          className=" bg-[#11CC75] items-center flex-1 ml-[12px] mt-[24px] h-[50px] justify-center rounded-[12px] px-[16px]">
          <Text className="text-[#fff] text-[18px] font-bold">登录/注册</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Login;
