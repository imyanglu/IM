import { UserOverview } from '@/type';
import * as SqlLite from 'expo-sqlite';

export const db = SqlLite.openDatabaseSync('database.db');

export type FriendRequestSchema = {
  id: number;
  senderId: string;
  receiverId: string;
  status: string;
  date: string;
  reason: string;
};

export const createFriendRequestTable = () => {
  db.execAsync(
    `create table if not exists friendsRequest(id integer primary key autoincrement, 
    senderId varchar(32), 
    receiverId varchar(32),
    status text,
    date text,
    reason text
     )`
  ).then(() => {
    console.log('创建好友请求表成功');
  });
};

export type UserOverviewSchema = Record<'id' | 'email' | 'avatar' | 'nickname' | 'bio', string>;
export const createUserOverviewTable = () => {
  db.execAsync(
    `create table if not exists usersOverview(id varchar(32) primary key, 
    avatar varchar(128),
    nickname varchar(32),
    bio varchar(256),
    email varchar(64)
     )`
  ).then(() => {
    console.log('创建用户概览表成功');
  });
};
