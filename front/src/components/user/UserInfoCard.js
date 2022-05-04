import React from 'react';

import {
  UserAKAInfo,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
  ColorButton,
} from '../styledCompo/uesrStyle';

//Mui
import { Typography } from '@mui/material';

const UserInfoCard = ({ currentUserInfo, isEditable, setCardState }) => {
  return (
    <>
      <UserCardFrame>
        <UserBodyInfo>
          <Typography variant="h6" style={{ color: '#c4c4c4' }}>
            height/weight
          </Typography>
          <Typography variant="h4">
            {currentUserInfo?.height}/{currentUserInfo?.weight}
          </Typography>
        </UserBodyInfo>
        <UserBadgeImgInfo>
          <img src={'/' + currentUserInfo?.icon + '.png'} alt="badge" style={{ width: 300 }}></img>
        </UserBadgeImgInfo>
        <UserAKAInfo>
          <Typography variant="h4">{currentUserInfo?.name}</Typography>
          <Typography variant="h6">{currentUserInfo?.status}</Typography>
        </UserAKAInfo>
        {isEditable && (
          <UserBtnInfo>
            <ColorButton sx={{ width: 120, height: 60 }} onClick={() => setCardState('EditInfo')}>
              Edit info
            </ColorButton>
            <ColorButton sx={{ width: 120, height: 60 }} onClick={() => setCardState('ChangePw')}>
              Change PW
            </ColorButton>
          </UserBtnInfo>
        )}
      </UserCardFrame>
    </>
  );
};

export default UserInfoCard;
