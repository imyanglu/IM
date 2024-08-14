import { getMe, queryFriendList } from '@/api';
import { FriendListAtom } from '@/atoms/friendsListAtom';
import { MeContext } from '@/Contexts/MeContext';
import { Storage } from '@/utils/storage';
import { SplashScreen, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { ReactNode, useContext, useEffect } from 'react';
import { createFriendRequestTable, createUserOverviewTable, db } from '@/database/init';

const RootView = ({ children }: { children: ReactNode }) => {
  const [_, changeMe] = useContext(MeContext);
  const router = useRouter();
  const [friends, setFriends] = useAtom(FriendListAtom);
  const initFriends = async () => {
    const data = await queryFriendList();
    setFriends(data.friends);
  };

  const initTables = () => {
    createFriendRequestTable();
    createUserOverviewTable();
    // db.runAsync('drop table friendsRequest').then((data) => {
    //   console.log('删除表成功');
    // });
  };

  const initUser = async () => {
    try {
      const me = await Storage.get('me');

      if (!me) {
        router.replace('/login');
        return;
      }
      changeMe(me);
      const data = await getMe();
      await initFriends();
      Storage.save('me', data.user);
      changeMe(data.user);
    } catch (err) {
    } finally {
      SplashScreen.hideAsync(); // 隐藏启动屏
    }
  };

  useEffect(() => {
    initUser();
    initTables();
  }, []);

  return <>{children}</>;
};
export default RootView;
