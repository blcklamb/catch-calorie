import styled from 'styled-components';
import { Button } from '@mui/material';
import { ColorButton } from './muiCustom';

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

export const RedSpan = styled.span`
  color: #f03e3e;
`;

// 로그인 페이지의 Login text
export const LoginText = styled.h1`
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

//ForgetPassword btn
export const ForgetPw = styled(Button)`
  font-style: italic;
  width: 140px;
  margin: 0;
`;

// Sign-up btn
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

//Sign-in btn
// export const SignInBtn = styled(ColorButton)`
//   border: 1px solid black;
// `;

//실험
export const Btn = styled.button`
  border-radius: 100rem;
  padding: 1rem;
  font-family: 'Avenir Next';
  font-size: 1rem;
  padding: 0.5rem 3rem;
  color: $color-black;
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 3px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(-45deg, #a8e054, #99da36);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #fff inset;

  &:hover {
    box-shadow: none;
    color: white;
  }
`;
