import { trimStr } from "./utils";

interface IUser {
    nickname: string
    room: string
}

let users: IUser[] = [];

const findUser = ({ nickname, room }: IUser) => {
  const userName = trimStr(nickname);
  const userRoom = trimStr(room);

  return users.find(
    ({ nickname, room }) => trimStr(nickname) === userName && trimStr(room) === userRoom
  );
};

const addUser = (user: IUser) => {
    const isExist = findUser(user);
  
    if (!isExist) {
        users.push(user);
    }
  
    const currentUser = isExist || user;
  
    return { isExist: !!isExist, user: currentUser };
};

const getRoomUsers = (room: string) => users
    .filter((user) => user.room === room)
    .map((user) => user.nickname);

export { addUser, findUser, getRoomUsers }
