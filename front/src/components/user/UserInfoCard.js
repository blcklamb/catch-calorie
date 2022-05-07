import React, { useState, useMemo } from 'react';

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
import { BodyInfo, NickInCardText, StatusInCardText } from '../styledCompo/UserCardStyle';
const convert = configureMeasurements({ mass, length });

const UserInfoCard = ({ currentUserInfo, isEditable, setCardState }) => {
  const [checked, setChecked] = useState(false);

  const temp = useMemo(() => {
    if (currentUserInfo?.unit === 'us') {
      setChecked(true);
      return;
    } else {
      setChecked(false);
    }
  }, [currentUserInfo]);

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
            <Typography style={{ color: '#c4c4c4', paddingTop: 30 }}>
              {checked ? 'height(ft)/weight(lb)' : 'height(cm)/weight(kg)'}
            </Typography>
            <BodyInfo style={{ paddingTop: 2, fontSize: '20px' }}>
              {checked
                ? convert(currentUserInfo?.height).from('cm').to('ft').toFixed(2) +
                  '/' +
                  convert(currentUserInfo?.weight).from('kg').to('lb').toFixed(2)
                : currentUserInfo?.height + '/' + currentUserInfo?.weight}
            </BodyInfo>
            {/* <IOSSwitch checked={checked} onChange={handleChange} /> */}
            <ButtonGroup
              style={{ marginBottom: -10, marginTop: 10 }}
              size="small"
              aria-label="small button group"
            >
              {buttons}
            </ButtonGroup>
          </UserBodyInfo>
        )}
        <br></br>
        <UserBadgeImgInfo>
          <img src={currentUserInfo?.icon} alt="badge" style={{ width: 280 }}></img>
        </UserBadgeImgInfo>
        <UserAKAInfo>
          <NickInCardText>{currentUserInfo?.name}</NickInCardText>
          <StatusInCardText>{currentUserInfo?.status}</StatusInCardText>
        </UserAKAInfo>
        {isEditable && (
          <UserBtnInfo>
            <ColorButton
              sx={{ width: 130, height: 50, fontSize: 18, marginRight: 2 }}
              onClick={() => setCardState('EditInfo')}
            >
              Edit info
            </ColorButton>
            <ColorButton
              sx={{ width: 130, height: 50, fontSize: 18 }}
              onClick={() => setCardState('ChangePw')}
            >
              Change PW
            </ColorButton>
          </UserBtnInfo>
        )}
      </UserCardFrame>
    </>
  );
};

export default UserInfoCard;
