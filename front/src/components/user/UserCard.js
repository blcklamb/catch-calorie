import React, { useState, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';
import * as Api from '../../api';

import {
  UserAKAInfo,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
  ColorButton,
} from '../styledCompo/uesrStyle';

//Mui
import { Button, Container } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePwForm from './ChangePwForm';

//currentUserInfo는 Mypage에서 올 때 받는 props
//eachUserId는 Network page 에서 올 때 받는 props
function UserCard({ currentUserInfo, isNetworkPage }) {
  const user = useRecoilValue(userInfoState);
  // const [curUser, setCurUser] = useState(undefined);
  // const [isEditable, setIsEditable] = useState(false);
  const isEditable = useMemo(() => currentUserInfo?._id === user?._id, [currentUserInfo, user]);
  const [isEditPw, setIsEditPw] = useState(false);
  // console.log(eachUserId);
  const navigate = useNavigate();
  // const params = useParams();

  // 유저가 누구인지에 따라 편집버튼 보이게 할지 말지
  // useEffect(() => {
  //   if (currentUserInfo?._id === user?._id) {
  //     setIsEditable(true);
  //   } else {
  //     setIsEditable(false);
  //   }
  // }, [currentUserInfo, user]);

  return (
    <>
      {/* <div>{curUser._id}</div> */}
      {isNetworkPage ? (
        <div
          style={{ width: 100 + '%', height: 360, backgroundColor: '#ecf8d9', borderRadius: 18 }}
        >
          <div>
            <div style={{ paddingTop: 20 }}>
              <img
                src={'/' + currentUserInfo.icon + '.png'}
                alt="badge"
                style={{ width: 80 + '%', display: 'block', margin: 'auto' }}
              ></img>
            </div>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Typography variant="h5">{currentUserInfo.name}</Typography>
            <Typography>{currentUserInfo.status}</Typography>
          </div>
          <Button
            sx={{ display: 'block', margin: 'auto', marginTop: '14px' }}
            variant="contained"
            onClick={() => navigate(`/${currentUserInfo._id}`)}
          >
            go
          </Button>
        </div>
      ) : (
        <>
          {isEditPw ? (
            <ChangePwForm setIsEditPw={setIsEditPw}></ChangePwForm>
          ) : (
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
                <img
                  src={'/' + currentUserInfo?.icon + '.png'}
                  alt="badge"
                  style={{ width: 300 }}
                ></img>
              </UserBadgeImgInfo>
              <UserAKAInfo>
                <Typography variant="h4">{currentUserInfo?.name}</Typography>
                <Typography variant="h6">{currentUserInfo?.status}</Typography>
              </UserAKAInfo>
              {isEditable && (
                <UserBtnInfo>
                  <ColorButton sx={{ width: 120, height: 60 }} onClick={() => navigate('/users')}>
                    Edit info
                  </ColorButton>
                  <ColorButton sx={{ width: 120, height: 60 }} onClick={() => setIsEditPw(true)}>
                    Change PW
                  </ColorButton>
                </UserBtnInfo>
              )}
            </UserCardFrame>
          )}
        </>
      )}
    </>
  );
}

export default UserCard;
