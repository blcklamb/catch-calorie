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
  padding-bottom: 45px;
`;

export const UserContainer = styled.div`
  width: 1203px;
  height: 700px;
  border-radius: 15px;
  // background-color: #c4c4c4;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1440px) {
    display: flex;
    flex-direction: column;
  }
`;

export const UserCardFrame = styled.div`
  width: 500px;
  height: 600px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 2.73186px 20.489px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10.489px);

  border-radius: 27.3186px;
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
  height: 70px;
  /* border-radius: 15px; */
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
  margin-top: 10px;
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

//헬퍼텍스트
export const RedSpan = styled.span`
  color: #f03e3e;
`;

// 로그인 페이지의 Login text
export const TitleText = styled.h1`
  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: 108px;
  margin-bottom: 150px;
  color: #f03e3e;
`;

//로그인 글라스 효과
export const LoginGlass = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: green;
  width: 734px;
  height: 988px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 2.73186px 20.489px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20.489px);

  border-radius: 27.3186px;
`;

//경고 글라스 효과
// export const AlertGlass = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-flow: column;
//   background-color: green;
//   width: 800px;
//   height: 400px;
//   background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
//     rgba(255, 255, 255, 0.3);

//   /* border-image: linear-gradient(to right, red 0%, orange 100%);
//   border-image-slice: 1;
//   box-shadow: 0px 2.73186px 20.489px rgba(0, 0, 0, 0.25); */

//   backdrop-filter: blur(20.489px);

//   border-radius: 27.3186px;
//   border: 3px solid red;
// `;

//Sign-up, ForgetPassword Container
export const SignPWContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;

//ForgetPassword btn
export const ForgetPw = styled(Button)`
  font-style: italic;
  width: 180px;
  margin: 0;
`;

// Sign-up btn
export const SignBtn = styled(ForgetPw)`
  width: 90px;
  &::after {
    content: '|';
    font-style: normal;
    color: #f03e3e;
    position: relative;
    left: 10px;
  }
`;

//background CATCH in loginform
export const CatchBack = styled.div`
  position: absolute;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: 357px;
  color: rgba(240, 62, 62, 0.3);
  top: 451px;
  left: -8%;
`;

//background CALORIES in loginform
export const CaloriesBack = styled.div`
  position: absolute;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: 357px;
  color: rgba(240, 62, 62, 0.3);
  top: 968px;
  right: -5%;
`;

//Sign-in btn
// export const SignInBtn = styled(ColorButton)`
//   border: 1px solid black;
// `;

//실험
// export const Btn = styled.button`
//   border-radius: 100rem;
//   padding: 1rem;
//   font-family: 'Avenir Next';
//   font-size: 1rem;
//   padding: 0.5rem 3rem;
//   color: $color-black;
//   box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
//   border: solid 3px transparent;
//   background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
//     linear-gradient(-45deg, #a8e054, #99da36);
//   background-origin: border-box;
//   background-clip: content-box, border-box;
//   box-shadow: 2px 1000px 1px #fff inset;

//   &:hover {
//     box-shadow: none;
//     color: white;
//   }
// `;

// 로그인 구분선
export const Separator = styled.div`
  border-top: 1px solid #203009;
  width: 98%;
  margin: 18px 0 24px 0;
`;

// 깃헙 로그인 버튼
export const GitHubBtn = styled.button`
  width: 100%;
  height: 40px;
  color: whitesmoke;
  background-color: #2b3137;
  border: none;
  border-radius: 10px;
`;
