import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../atoms';

import {
  BadgesContainer,
  UserAKAInfo,
  UserContainer,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
  ColorButton,
  CardText,
} from '../../styledCompo/uesrStyle';

function UserGraph({ currentUserInfo }) {
  return (
    <>
      <UserCardFrame>userGraph</UserCardFrame>
    </>
  );
}

export default UserGraph;
