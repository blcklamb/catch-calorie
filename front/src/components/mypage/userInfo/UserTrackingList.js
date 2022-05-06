import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState, trackingListState } from '../../../atoms';

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
} from '../../styledCompo/LoginStyle';

import TrackingLists from '../../trackingList/TrackingLists';

function UserTrackingList({ currentUserInfo }) {
  return (
    <>
      <UserCardFrame>
        <TrackingLists />
      </UserCardFrame>
    </>
  );
}

export default UserTrackingList;
