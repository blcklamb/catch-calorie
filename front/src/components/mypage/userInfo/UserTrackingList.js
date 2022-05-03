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
} from '../../styledCompo/uesrStyle';

import TrackingLists from '../../trackingList/TrackingLists';

function UserTrackingList({ currentUserInfo }) {

  return (
    <>
      <UserCardFrame>
        트래킹 리스트 데모
        <TrackingLists />
      </UserCardFrame>
    </>
  );
}

export default UserTrackingList;
