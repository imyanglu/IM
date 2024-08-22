import { db, FriendRequestSchema } from '../init';

export const updateFriendRequestStatus = async (
  data: Array<{ sId: string; rId: string; status: string }>
) => {
  // 0 = pending, 1 = accepted, 2 = rejected
  const statement = await db.prepareAsync(
    'update friendsRequest set status = $status where senderId = $sId and receiverId = $rId'
  );

  const res = await Promise.allSettled(
    data.map((u) => {
      const { sId, rId, status } = u;
      return statement.executeAsync({
        $sId: sId,
        $rId: rId,
        $status: status,
      });
    })
  ).finally(() => {
    statement.finalizeSync();
  });
};

export const addFriendRequest = async (
  data: Array<Omit<FriendRequestSchema, 'id' | 'status' | 'date'> & { status: string }>
) => {
  const statement = await db.prepareAsync(
    'insert or replace into friendsRequest(senderId, receiverId, reason, date,status) values($senderId, $receiverId, $reason, $date,$status)'
  );
  const dateStr = new Date().toISOString();

  const res = await Promise.allSettled(
    data.map((u) => {
      const { senderId, receiverId, reason, status } = u;
      return statement.executeAsync({
        $senderId: senderId,
        $receiverId: receiverId,
        $reason: reason,
        $date: dateStr,
        $status: status,
      });
    })
  ).finally(async () => {
    await statement.finalizeAsync();
  });

  console.log(res.values());
};

export const getFriendRequests = async (userId: string) => {
  const rows = await db.getAllAsync<FriendRequestSchema>(
    `select * from friendsRequest where receiverId = "${userId}" or senderId = "${userId}"`
  );
  return rows;
};
