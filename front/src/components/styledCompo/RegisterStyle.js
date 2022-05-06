import styled from 'styled-components';
import { LoginGlass, TitleText } from './LoginStyle';
import { Button } from '@mui/material';

//회원가입 타이틀
export const RegisterTitle = styled(TitleText)`
  padding-top: 130px;
  padding-bottom: 130px;
  margin-bottom: 0;
`;

// 회원가입 글래스
export const RegisterGlass = styled(LoginGlass)`
  height: 1400px;
  justify-content: flex-start;
`;

// 성별 버튼
export const GenderBtn = styled(Button)`
  width: 50%;
  height: 44px;
`;

//동그라미들
export const RegisterCircleRed1 = styled.div`
  position: absolute;
  width: 367.49px;
  height: 367.49px;
  right: 15%;
  top: 218.12px;

  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    #c62e2e 0%,
    #e44545 29.02%,
    #f39999 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const RegisterCircleRed2 = styled.div`
  position: absolute;

  width: 69.21px;
  height: 69.21px;
  left: 30%;
  top: 710.33px;

  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    #c62e2e 0%,
    #e44545 29.02%,
    #f39999 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const RegisterCircleGreen1 = styled.div`
  position: absolute;
  width: 179.81px;
  height: 179.81px;
  right: 30%;
  top: 971.54px;

  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    rgba(105, 156, 29, 0.9) 0%,
    #77bb41 29.02%,
    #d6eeb1 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const RegisterCircleGreen2 = styled.div`
  position: absolute;
  width: 528.14px;
  height: 528.14px;
  left: 10%;
  top: 1303.59px;

  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    rgba(105, 156, 29, 0.9) 0%,
    #77bb41 29.02%,
    #d6eeb1 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
