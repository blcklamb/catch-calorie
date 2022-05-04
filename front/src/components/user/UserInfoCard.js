import React, { useState } from 'react';

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
import { Switch } from '@mui/material';

//단위변환
import configureMeasurements, { mass, length } from 'convert-units';
const convert = configureMeasurements({ mass, length });

const UserInfoCard = ({ currentUserInfo, isEditable, setCardState }) => {
  const [checked, setChecked] = useState(currentUserInfo?.unit === 'us' ? true : false);
  console.log(checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <UserCardFrame>
        <UserBodyInfo>
          <Typography variant="h6" style={{ color: '#c4c4c4' }}>
            {checked ? 'height(ft)/weight(lb)' : 'height(cm)/weight(kg)'}
          </Typography>
          <Typography variant="h4">
            {checked
              ? convert(currentUserInfo?.height).from('cm').to('ft').toFixed(0) +
                '/' +
                convert(currentUserInfo?.weight).from('kg').to('lb').toFixed(0)
              : currentUserInfo?.height + '/' + currentUserInfo?.weight}
          </Typography>
          <Switch checked={checked} onChange={handleChange} />
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
