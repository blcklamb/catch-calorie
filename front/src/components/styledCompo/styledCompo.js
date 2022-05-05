import styled from 'styled-components';
import { Button } from '@mui/material';

// UserCard에서 사용하는 스타일드 컴포넌트

export const BadgesContainer = styled.div`
  margin-top: 180px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-flow: column;
`;

export const UserContainer = styled.div`
  width: 1203px;
  height: 700px;
  border-radius: 15px;
  // background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserCardFrame = styled.div`
  width: 500px;
  height: 600px;
  border-radius: 15px;
  background-color: #ecf8d9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  & + & {
    margin-left: 80px;
  }
`;

export const UserBodyInfo = styled.div`
  width: 400px;
  height: 50px;
  border-radius: 15px;
  // background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 20px;
`;

export const UserAKAInfo = styled.div`
  width: 400px;
  height: 50px;
  border-radius: 15px;
  // background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const UserBtnInfo = styled.div`
  width: 400px;
  height: 100px;
  border-radius: 15px;
  // background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const UserBadgeImgInfo = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 15px;
  // background-color: #ec4849;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardText = styled.div`
  width: 1203px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  top: 50px;
  left: 70px;
  z-index: 30;
`;

// 로그인 페이지의 Login text
export const LoginText = styled.h1`
  margin: 10px;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: 81px;
  margin-bottom: 131px;
  color: #f03e3e;
`;

//로그인 글라스 효과
export const LoginGlass = styled.div`
  background-color: green;
  width: 550px;
  height: 741px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 2.73186px 20.489px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20.489px);

  border-radius: 27.3186px;
`;

//Sign-up, ForgetPassword Container
export const SignPWContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

//ForgetPassword
export const ForgetPw = styled(Button)`
  font-style: italic;
  width: 140px;
  margin: 0;
`;

// Sign-up
export const SignBtn = styled(ForgetPw)`
  width: 70px;

  &::after {
    content: '|';
    font-style: normal;
    color: #f03e3e;
    position: relative;
    left: 9px;
  }
`;
