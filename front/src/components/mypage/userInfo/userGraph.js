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

import MainGraph from '../../main/MainGraph';

function UserGraph({ currentUserInfo }) {
  return (
    <>
      <UserCardFrame>
        userGraph 데모
        <MainGraph />
      </UserCardFrame>
    </>
  );
}

export default UserGraph;
