import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Jandi from './Jandi.js';
import Badges from './Badges.js';
import UserCard from '../user/UserCard';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfoState } from '../../atoms.js';

const BadgesPage = styled.section`
  height: 50%;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 30px;
`;

const JandiPage = styled.section`
  height: 60%;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
`;

function Mypage() {
  const user = useRecoilValue(userInfoState);
  const params = useParams();

  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  useEffect(() => {
    if (params.user_id) {
      // 네트워크에서 다른 유저를 눌러서 들어온 경우(network/:user_id) 해당 params를 통해 다른 유저 마이페이지 정보를 가져옴
      // network/:user_id API 요망
      // setCurrentUserInfo('비동기 통신으로 받아온 마이페이지 정보')
    } else {
      // 네트워크가 아닌 마이페이 누르기를 통해 들어온 경우 전역에 있는 아이디값을 통해 자신의 마이페이지 정보를 가저옴
      // mypage API 요망
      // setCurrentUserInfo('비동기 통신으로 받아온 마이페이지 정보')
      console.log(user);
      setCurrentUserInfo(user);
    }
  }, [params, user]);

  return (
    <>
      <Header />
      <UserCard currentUserInfo={currentUserInfo} />
      <BadgesPage>
        <Badges />
      </BadgesPage>
      <JandiPage>
        <Jandi />
      </JandiPage>

      <Footer />
    </>
  );
}

export default Mypage;
