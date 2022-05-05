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
} from '../../styledCompo/styledCompo';

import MainGraph from '../../main/MainGraph';

function UserGraph({ currentUserInfo }) {
  return (
    <>
      <UserCardFrame>
        <MainGraph />
      </UserCardFrame>
    </>
  );
}

export default UserGraph;
