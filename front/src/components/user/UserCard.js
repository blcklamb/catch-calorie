import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

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

//currentUserInfo는 Mypage에서 올 때 받는 props
//eachUserId는 Network page 에서 올 때 받는 props
function UserCard({ currentUserInfo, eachUserId }) {
  const user = useRecoilValue(userInfoState);
  const [isEditable, setIsEditable] = useState(true);

  // console.log(eachUserId);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  // 유저가 누구인지에 따라 편집버튼 보이게 할지 말지
  useEffect(() => {
    console.log('userCard', eachUserId, currentUserInfo);
    //eachUserId 가 있을 경우 실행
    if (eachUserId || currentUserInfo || params) {
      if (eachUserId?._id === user._id) {
        setIsEditable(true);
      } else if (currentUserInfo?._id === user._id) {
        setIsEditable(true);
      } else if (params?.user_id === user._id) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
    }
  }, [eachUserId, currentUserInfo, user, params]);

  return (
    <>
      {eachUserId ? (
        <Container>
          <div style={{ width: 100 + '%', height: 250, backgroundColor: '#ecf8d9' }}>
            <div>
              <Typography variant="h6" style={{ color: '#c4c4c4' }}>
                height/weight
              </Typography>
              <Typography variant="h4">
                {eachUserId.height}/{eachUserId.weight}
              </Typography>
            </div>
            <div>
              <img src="/runner.png" alt="badge" style={{ width: 100 }}></img>
            </div>
            <div>
              <Typography variant="h4">{eachUserId.name}</Typography>
              <Typography variant="h6">{eachUserId.status}</Typography>
            </div>
            <Button onClick={() => navigate(`/${eachUserId._id}`)}>go</Button>
          </div>
        </Container>
      ) : (
        <UserCardFrame>
          <UserBodyInfo>
            <Typography variant="h6" style={{ color: '#c4c4c4' }}>
              height/weight
            </Typography>
            <Typography variant="h4">200/100</Typography>
          </UserBodyInfo>
          <UserBadgeImgInfo>
            <img src="/runner.png" alt="badge" style={{ width: 300 }}></img>
          </UserBadgeImgInfo>
          <UserAKAInfo>
            <Typography variant="h4">닉네임</Typography>
            <Typography variant="h6">상태메세지</Typography>
          </UserAKAInfo>
          {isEditable && (
            <UserBtnInfo>
              <ColorButton sx={{ width: 120, height: 60 }} onClick={() => navigate('/users')}>
                Edit info
              </ColorButton>
              <ColorButton sx={{ width: 120, height: 60 }}> Change PW</ColorButton>
            </UserBtnInfo>
          )}
        </UserCardFrame>
      )}
    </>
  );
}

export default UserCard;
