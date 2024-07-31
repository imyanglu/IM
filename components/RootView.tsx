import { getMe } from '@/api';
import { MeContext } from '@/Contexts/MeContext';
import { SplashScreen } from 'expo-router';
import { ReactNode, useContext, useEffect } from 'react';
import { View } from 'react-native';

const RootView = ({ children }: { children: ReactNode }) => {
  const [_, changeMe] = useContext(MeContext);

  const initUser = () => {
    getMe()
      .then((data) => {
        changeMe(data.user);
      })
      .finally(() => {
        SplashScreen.hideAsync();
      });
  };

  useEffect(() => {
    initUser();
  }, []);

  return <>{children}</>;
};
export default RootView;
