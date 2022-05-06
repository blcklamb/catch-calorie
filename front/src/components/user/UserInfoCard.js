import React, { useState } from 'react';

import {
  UserAKAInfo,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
} from '../styledCompo/LoginStyle';

import { ColorButton, IOSSwitch } from '../styledCompo/muiCustom';

//Mui
import { Typography } from '@mui/material';
import { Switch, Button, ButtonGroup } from '@mui/material';

//단위변환
import configureMeasurements, { mass, length } from 'convert-units';
const convert = configureMeasurements({ mass, length });

const UserInfoCard = ({ currentUserInfo, isEditable, setCardState }) => {
  const [checked, setChecked] = useState(currentUserInfo?.unit === 'us' && true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  const buttons = [
    <Button
      key="cm/kg"
      color="success"
      variant={!checked ? 'contained' : 'outlined'}
      onClick={() => setChecked(false)}
    >
      Metric
    </Button>,
    <Button
      key="ft/lb"
      color="success"
      variant={checked ? 'contained' : 'outlined'}
      onClick={() => setChecked(true)}
    >
      U.S.Standard
    </Button>,
  ];
  return (
    <>
      <UserCardFrame>
        {currentUserInfo?.open && (
          <UserBodyInfo>
            <Typography variant="h6" style={{ color: '#c4c4c4' }}>
              {checked ? 'height(ft)/weight(lb)' : 'height(cm)/weight(kg)'}
            </Typography>
            <Typography variant="h4">
              {checked
                ? convert(currentUserInfo?.height).from('cm').to('ft').toFixed(2) +
                  '/' +
                  convert(currentUserInfo?.weight).from('kg').to('lb').toFixed(2)
                : currentUserInfo?.height + '/' + currentUserInfo?.weight}
            </Typography>
            {/* <IOSSwitch checked={checked} onChange={handleChange} /> */}
            <ButtonGroup size="small" aria-label="small button group">
              {buttons}
            </ButtonGroup>
          </UserBodyInfo>
        )}
        <br></br>
        <UserBadgeImgInfo>
          <img src={currentUserInfo?.icon} alt="badge" style={{ width: 300 }}></img>
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
