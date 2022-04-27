import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms';

const UserEditForm = () => {
  const [user, setUser] = useRecoilState(userState);

  return;
  <div>{user}</div>;
};

export default UserEditForm;
