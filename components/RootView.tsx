import { getMe, getNewFriendReq, queryFriendList } from '@/api';
import { FriendListAtom } from '@/atoms/friendsListAtom';
import { MeContext } from '@/Contexts/MeContext';
import { Storage } from '@/utils/storage';
import { SplashScreen, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { ReactNode, useContext, useEffect } from 'react';
import { createFriendRequestTable, createUserOverviewTable, db } from '@/database/init';
import { addFriendRequest } from '@/database/models/friend';
import { createUsers } from '@/database/models/user';

const RootView = ({ children }: { children: ReactNode }) => {
  const [_, changeMe] = useContext(MeContext);
  const router = useRouter();
  const [friends, setFriends] = useAtom(FriendListAtom);
  const initFriends = async () => {
    try {
      const data = await queryFriendList();
      setFriends(data.friends);
    } catch (err) {}
  };

  const initTables = () => {
    createFriendRequestTable();
    createUserOverviewTable();
    // db.runAsync('drop table friendsRequest').then((data) => {
    //   console.log('删除表成功');
    // });
  };

  const initFriendRequests = async () => {
    const result = await getNewFriendReq();
    const users = result.users;

    createUsers(users);
    // addFriendRequest()
  };

  const initUser = async () => {
    try {
      const me = await Storage.get('me');
      if (!me) {
        return router.replace('/login');
      }
      changeMe(me);
      const data = await getMe();
      initFriends();
      initFriendRequests();
      Storage.save('me', data.user);
      changeMe(data.user);
    } catch (err) {
      console.log(err, 'eee');
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
