import React, { useContext, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

import Container from '@mui/material/Container';

// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

export const BodyContainer = styled.div`
  width: 100%;

  /* background: pink; */

  align-content: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 180px;
  display: grid;
`;

export const MainHelloSection = styled.div`
  width: 100%;
  padding: 20px 20px;

  /* background: yellow; */
  display: flex;
  align-items: center;
  height: 150px;
  align-content: center;
  position: relative;
`;

export const MainSection1 = styled.div`
  display: inline-flex;
  margin-bottom: 80px;
`;

export const Section = styled.div`
  height: 100%;
  position: relative;
  padding: 30px 40px;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(30px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 40px;
`;

// 탭 ----------------------------------------------------------------------------------------
export const TrackingForms = styled.div`
  // 폼만 스크롤 범위
  height: 250px;
  overflow: auto;

  // 스크롤 전범위
  /* height: auto; */
`;

export const TrackingForm = styled.div`
  /* height: 80px;  */
  display: flex;
  margin: 20px 0;
`;

export const TrackingAutoContainer = styled.div`
  width: 300px;
  margin-right: 20px;
`;

export const TrackingTextFieldContainer = styled.div`
  width: 150px;
  margin-right: 20px;

  /* component="form"
sx={{
'& > :not(style)': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off" */
`;

export const TrackingSwitchContainer = styled.div`
  float: right;
  flex-grow: 1;
  text-align: right;
`;

export const TrackingButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  display: inline-flex;
  /* margin-top: 190px; */
  margin-top: 50px;

  // 버튼 하단으로 조정
  /* position: relative;
  left: 0;
  bottom: 0; */
`;

export const TrackingLeftButtonContainer = styled.div``;
export const TrackingRightButtonContainer = styled.div`
  flex-grow: 1;
  text-align: right;
`;

export const TrackingPlusButtonContainer = styled.div`
  margin-bottom: 60px;
`;

// 그래프 ----------------------------------------------------------------------------------------
export const CalorieGraphSection = styled.div`
  text-align: center;
  height: 480px;
`;

export const GraphContainer = styled.div`
  width: 400px;
`;

export const GraphOverContainer = styled.div``;

// Tracking List ----------------------------------------------------
export const TrackingListTable = styled.table`
  width: 100%;
  /* border: 1px solid #444444; */
  border-collapse: collapse;

  // 행 여백
  border-collapse: separate;
  border-spacing: 0 20px;
`;

// Table Header
export const TrackingListTh = styled.th`
  /* border: 1px solid #444444; */
  padding: 10px;
  text-align: left;
`;

export const TrackingListThName = styled(TrackingListTh)`
  width: 40%;
  padding-left: 30px;
`;

export const TrackingListThContent = styled(TrackingListTh)`
  width: 20%;
`;

export const TrackingListThAction = styled(TrackingListTh)`
  width: 5%;
  text-align: center;
`;

export const TrackingListThEnd = styled(TrackingListThAction)`
  padding-right: 30px;
`;

// Table Body
export const TrackingListTr = styled.tr`
  line-height: 3.5rem;

  // 유리
  box-sizing: border-box;

  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  /* background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3); */
  box-shadow: 0px 5.334px 40.005px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40.005px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 26.67px;
`;

export const TrackingListTd = styled.td`
  /* border: 1px solid #444444; */
  padding: 10px;
`;

export const TrackingListTdAction = styled(TrackingListTd)`
  text-align: center;
`;

export const TrackingListTdStart = styled(TrackingListTd)`
  padding-left: 30px;
`;

export const TrackingListTdEnd = styled(TrackingListTdAction)`
  padding-right: 30px;
  text-align: right;
`;

export const TrackingListTdInput = styled(TrackingListTd)`
  padding: 0px;
  line-height: 0.4rem;
`;

export const TrackingListTdInputText = styled.td`
  text-align: center;
`;
