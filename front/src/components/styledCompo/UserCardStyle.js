import { Typography } from '@mui/material';
import styled from 'styled-components';
import { NickText, StatusText } from './NetworkCardStyle';

export const NickInCardText = styled(NickText)`
  width: 300px;
`;

export const StatusInCardText = styled(StatusText)`
  width: 300px;
`;
//신체 사이즈 보여주는 곳
export const BodyInfo = styled(Typography)`
  padding-top: 5px !important;
  font-family: 'Jost', sans-serif !important;
  font-style: italic !important;
  font-weight: 800 !important;
  color: #f03e3e !important;
`;
