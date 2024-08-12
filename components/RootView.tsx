import { getMe } from '@/api';
import { MeContext } from '@/Contexts/MeContext';
import { Storage } from '@/utils/storage';
import { SplashScreen, useRouter } from 'expo-router';
import { ReactNode, useContext, useEffect } from 'react';
import { View } from 'react-native';

const RootView = ({ children }: { children: ReactNode }) => {
  const [_, changeMe] = useContext(MeContext);
  const router = useRouter();
  const initUser = async () => {
    try {
      const me = await Storage.get('me');
      if (!me) {
        router.push('/login');
        return;
      }
      changeMe(me);
      const data = await getMe();
      Storage.save('me', data.user);
      changeMe(data.user);
    } catch (err) {
    } finally {
      SplashScreen.hideAsync(); // 隐藏启动屏
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  return <>{children}</>;
};
export default RootView;
