import React, { useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import ChangePwForm from './ChangePwForm';
import UserInfoCard from './UserInfoCard';
import UserEditCard from './UserEditCard';
import UserNetworkCard from './UserNetworkCard';

//currentUserInfo는 Mypage에서 올 때 받는 props
//eachUserId는 Network page 에서 올 때 받는 props
function UserCard({ currentUserInfo, isNetworkPage }) {
  const user = useRecoilValue(userInfoState);
  const isEditable = useMemo(() => currentUserInfo?._id === user?._id, [currentUserInfo, user]);
  const [cardState, setCardState] = useState('userInfo');
  // console.log(cardState);

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
        return <UserEditCard setCardState={() => setCardState('UserInfo')} />;
      case 'ChangePw':
        return <ChangePwForm setCardState={() => setCardState('UserInfo')} />;

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
      {isNetworkPage ? <UserNetworkCard currentUserInfo={currentUserInfo} /> : <>{switchCard()}</>}
    </>
  );
}

export default UserCard;
