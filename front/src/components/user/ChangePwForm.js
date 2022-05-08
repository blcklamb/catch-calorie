import { useState } from 'react';

//Compo
import * as Api from '../../api';

//mui
import { Typography } from '@mui/material';

// styled component
import {
  UserAKAInfo,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
} from '../styledCompo/LoginStyle';

import { ColorButton, ValidationTextField } from '../styledCompo/muiCustom';
import { BodyInfo } from '../styledCompo/UserCardStyle';

const ChangePwForm = ({ setCardState }) => {
  //현재 바밀번호와, 바꿀 비밀번호를 저장하는 state
  const [pwInfo, setPwInfo] = useState({
    oldPw: '',
    newPw: '',
  });
  //구조분해
  const { oldPw, newPw } = pwInfo;
  //비밀번호 확인 저장 state
  const [confirmPw, setConfirmPw] = useState('');

  //비밀번호 4자리 이상
  const isPWValid = newPw.length >= 4;
  // 두 비밀번호가 같은지
  const isSamePW = newPw === confirmPw;
  // 위 두 조건이 동시에 만족하는지
  const isFormValid = isPWValid && isSamePW;

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwInfo({
      ...pwInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = Api.put('password', {
        old_pw: oldPw,
        new_pw: newPw,
      });

      setCardState();
      alert('Your password has been changed successfully');
    } catch (err) {
      console.log('아쉽게도 잘 가지 않았군요 휴먼', err);
    }
  };

  return (
    <>
      <UserCardFrame>
        <UserBodyInfo></UserBodyInfo>
        <UserBodyInfo>
          <BodyInfo variant="h5">PW Change Form</BodyInfo>
        </UserBodyInfo>

        <UserBadgeImgInfo style={{ flexFlow: 'column' }}>
          <ValidationTextField
            sx={{ width: 300 }}
            autoFocus
            required
            type="password"
            label="Current Password"
            name="oldPw"
            value={oldPw}
            onChange={handlePwChange}
          />
          <br />
          <br />
          <ValidationTextField
            sx={{ width: 300 }}
            required
            type="password"
            label="Password to change"
            name="newPw"
            value={newPw}
            onChange={handlePwChange}
            helperText={!isPWValid && <span>Password is more than 4 characters.</span>}
          />
          <br />
          <ValidationTextField
            sx={{ width: 300 }}
            required
            type="password"
            label="Confirm password to change"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            helperText={!isFormValid && <span>Passwords do not match.</span>}
          />
        </UserBadgeImgInfo>
        <UserAKAInfo></UserAKAInfo>

        <UserBtnInfo>
          <ColorButton
            sx={{ width: 130, height: 50, fontSize: 18, marginRight: 2 }}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Confirm
          </ColorButton>
          <ColorButton sx={{ width: 130, height: 50, fontSize: 18 }} onClick={() => setCardState()}>
            Cancel
          </ColorButton>
        </UserBtnInfo>
      </UserCardFrame>
    </>
  );
};

export default ChangePwForm;
