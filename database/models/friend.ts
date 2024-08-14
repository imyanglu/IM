import { db, FriendRequestSchema } from '../init';

export const addFriendRequest = async (
  data: Omit<FriendRequestSchema, 'id' | 'status' | 'date'>
) => {
  const { senderId, receiverId, reason } = data;
  const dateStr = new Date().toISOString();
  await db.runAsync(
    'insert into friendsRequest(senderId, receiverId, reason, date,status) values(?, ?, ?, ?,"pending")',
    [senderId, receiverId, reason, dateStr]
  );
};

export const getFriendRequests = async (userId: string) => {
  const rows = await db.getAllAsync<FriendRequestSchema>(
    `select * from friendsRequest where receiverId = "${userId}" or senderId = "${userId}"`
  );
  return rows;
};
