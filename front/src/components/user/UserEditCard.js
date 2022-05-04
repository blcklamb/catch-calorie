import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { userInfoState } from '../../atoms';
import * as Api from '../../api';

import {
  UserAKAInfo,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
  ColorButton,
  ValidationTextField,
} from '../styledCompo/uesrStyle';

//Mui
import { Typography } from '@mui/material';

const UserEditCard = ({ setCardState }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [editUser, setEditUser] = useState(userInfo);

  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = editUser.name.length >= 2;
  // 공백이나 숫자인지 여부를 확인함.
  const isHeightValid = String(editUser.height).length > 0 && Number(editUser.height) > 0;
  // 공백이나 숫자인지 여부를 확인함.
  const isWeightValid = String(editUser.weight).length > 0 && Number(editUser.weight) > 0;

  // 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isNameValid && isHeightValid && isWeightValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('원래 uesr 정보', userInfo);
      console.log('put 요청 보내기 전 수정한 user 정보', editUser);
      const res = await Api.put(`users/${userInfo._id}`, {
        email: editUser.email,
        password: editUser.password,
        name: editUser.name,
        gender: editUser.gender,
        height: Number(editUser.height),
        weight: Number(editUser.weight),
        icon: editUser.icon,
        status: editUser.status,
      });

      console.log('회원 정보 수정 후 PUT 응답으로 수정된 회원 정보를 가져옵니다.', res.data);
      setUserInfo(res.data);
      setCardState();
      console.log('req 요청 갔고 응답 받았습니다..');
    } catch (err) {
      console.log(`req 요청이 제대로 가지 않았군요 ${err}`);
    }
  };

  return (
    <>
      <UserCardFrame>
        <UserBodyInfo>
          <Typography variant="h4">Edit User Info</Typography>
        </UserBodyInfo>
        <UserBodyInfo></UserBodyInfo>

        <UserBadgeImgInfo style={{ flexFlow: 'column' }}>
          <ValidationTextField
            required
            sx={{ width: 300 }}
            error={!isNameValid}
            label="Nick Name"
            helperText={!isNameValid && <span>Please set the nickname at least 2 characters.</span>}
            value={editUser.name}
            onChange={(e) => {
              setEditUser((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <br />
          {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            sx={{ width: 300 }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={editUser.gender}
            onChange={(e) => setEditUser((prev) => ({ ...prev, gender: e.target.value }))}
          >
            <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
            <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
          </RadioGroup>
          <br /> */}
          <ValidationTextField
            required
            sx={{ width: 300 }}
            error={!isHeightValid}
            label="Height"
            helperText={
              !isHeightValid && <span>Please enter a number only.(The unit is feet.)</span>
            }
            value={editUser.height}
            onChange={(e) => {
              setEditUser((prev) => ({ ...prev, height: e.target.value }));
            }}
          />
          <br></br>
          <ValidationTextField
            required
            sx={{ width: 300 }}
            error={!isWeightValid}
            label="Weight"
            helperText={
              !isWeightValid && <span>Please enter a number only.(The unit is pounds.)</span>
            }
            value={editUser.weight}
            onChange={(e) => {
              setEditUser((prev) => ({ ...prev, weight: e.target.value }));
            }}
          />
          <br></br>
          <ValidationTextField
            label="Status"
            sx={{ width: 300 }}
            value={editUser.status}
            onChange={(e) => {
              setEditUser((prev) => ({ ...prev, status: e.target.value }));
            }}
          />
        </UserBadgeImgInfo>
        <UserAKAInfo></UserAKAInfo>

        <UserBtnInfo>
          <ColorButton
            sx={{ width: 120, height: 60 }}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Confirm
          </ColorButton>
          <ColorButton sx={{ width: 120, height: 60 }} onClick={() => setCardState()}>
            Cancel
          </ColorButton>
        </UserBtnInfo>
      </UserCardFrame>
    </>
  );
};

export default UserEditCard;
