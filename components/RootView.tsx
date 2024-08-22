import { getMe, getNewFriendReq, queryFriendList } from '@/api';
import { FriendListAtom } from '@/atoms/friendsListAtom';
import { MeContext } from '@/Contexts/MeContext';
import { Storage } from '@/utils/storage';
import { SplashScreen, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { createFriendRequestTable, createUserOverviewTable, db } from '@/database/init';

import { createUsers } from '@/database/models/user';
import { addFriendRequest } from '@/database/models/friend';

const RootView = ({ children }: { children: ReactNode }) => {
  const [me, changeMe] = useContext(MeContext);
  const [loaded, setLoaded] = useState(false);
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

  const initFriendRequests = async (meId: string) => {
    const result = await getNewFriendReq();

    const users = result.users;
    createUsers(users);
    addFriendRequest(
      users.map((item) => ({
        senderId: item.id,
        receiverId: meId,
        reason: item.reason,
        status: item.status,
      }))
    );
  };

  const initUser = async () => {
    try {
      const me = await Storage.get('me');
      if (!me) {
        setLoaded(true);
        return router.replace('/login');
      }
      changeMe(me);
      setLoaded(true);
      const data = await getMe();
      initFriends();
      initFriendRequests(data.user.id);
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
  if (!loaded) return <></>;
  return <>{children}</>;
};
export default RootView;
