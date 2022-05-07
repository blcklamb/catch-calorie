import styled from 'styled-components';
import { ColorButton } from './muiCustom';
import { LoginGlass } from './LoginStyle';
import { Typography } from '@mui/material';

// 유리
export const NetworkGlass = styled(LoginGlass)`
  width: 100%;
  height: 354px;
  @media screen and (max-width: 1040px) {
    height: 460px;
  }
`;

//status
export const StatusText = styled.div`
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해 word-break:break-all
  width: 200px;
  font-size: 16px;

  @media screen and (max-width: 1040px) {
    width: 100px;
    font-size: 14px;
  }
`;

export const NickText = styled.div`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* color: #f03e3e; */
  font-family: 'Jost', sans-serif !important;
  font-style: italic;
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 10px;

  @media screen and (max-width: 1040px) {
    width: 100px;
    font-size: 18px;
  }
`;
