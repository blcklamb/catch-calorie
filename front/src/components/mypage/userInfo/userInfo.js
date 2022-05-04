import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../atoms';

import UserCard from '../../user/UserCard';

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

import { useNavigate } from 'react-router-dom';
import UserGraph from './userGraph';

function UserInfo({ currentUserInfo }) {
  return (
    <>
      <BadgesContainer>
        {/* <CardText>UserCard</CardText> */}
        <UserContainer>
          <UserCard currentUserInfo={currentUserInfo}></UserCard>
          <UserGraph currentUserInfo={currentUserInfo}></UserGraph>
        </UserContainer>
      </BadgesContainer>
    </>
  );
}

export default UserInfo;
