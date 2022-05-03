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
import UserInfoCard from './UserInfoCard';
import UserEditCard from './UserEditCard';

//currentUserInfo는 Mypage에서 올 때 받는 props
//eachUserId는 Network page 에서 올 때 받는 props
function UserCard({ currentUserInfo, isNetworkPage }) {
  const user = useRecoilValue(userInfoState);
  const isEditable = useMemo(() => currentUserInfo?._id === user?._id, [currentUserInfo, user]);
  const [cardState, setCardState] = useState('userInfo');
  // console.log(cardState);

  const navigate = useNavigate();

  // 유저 카드에서 버튼 누를시 각 페이지 렌더링 하는 스위치 함수
  // userInfo, EditInfo, ChangePw
  const switchCard = () => {
    switch (cardState) {
      case 'userInfo':
        return (
          <UserInfoCard
            currentUserInfo={currentUserInfo}
            isEditable={isEditable}
            setCardState={setCardState}
          />
        );
      case 'EditInfo':
        return (
          <UserEditCard
            currentUserInfo={currentUserInfo}
            isEditable={isEditable}
            setCardState={setCardState}
          />
        );
      case 'ChangePw':
        return <ChangePwForm setCardState={setCardState} />;

      default:
        return (
          <UserInfoCard
            currentUserInfo={currentUserInfo}
            isEditable={isEditable}
            setCardState={setCardState}
          />
        );
    }
  };

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
        <>{switchCard()}</>
      )}
    </>
  );
}

export default UserCard;
