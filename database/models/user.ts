import { db, UserOverviewSchema } from '../init';

export const createUser = (user: UserOverviewSchema) => {
  const { id, email, avatar, nickname, bio } = user;
  db.runAsync(
    `insert or replace into  usersOverview(id,email,avatar,nickname,bio) values(?,?,?,?,?)`,
    [id, email, avatar, nickname, bio]
  );
};

export const createUsers = async (users: UserOverviewSchema[]) => {
  const statement = await db.prepareAsync(
    'INSERT  or replace into usersOverview (id,email,avatar,nickname,bio) VALUES ($id,$email,$avatar,$nickname,$bio)'
  );
  await Promise.allSettled(
    users.map((u) =>
      statement.executeAsync({
        $id: u.id,
        $email: u.email,
        $avatar: u.avatar,
        $nickname: u.nickname,
        $bio: u.bio,
      })
    )
  );
};

export const getUser = (id: string) => {
  return db.getFirstAsync<UserOverviewSchema>(`select * from usersOverview where id = ?`, [id]);
};
