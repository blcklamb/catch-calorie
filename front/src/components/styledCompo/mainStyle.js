import React, { useContext, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

import Container from '@mui/material/Container';

// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

export const BodyContainer = styled.div`
  width: 100%;

  background: pink;

  align-content: center;
  justify-content: center;
  margin-top: 180px;
  margin-bottom: 180px;
  display: grid;
`;

export const MainHelloSection = styled.div`
  width: 100%;
  padding: 20px 20px;

  background: yellow;
  display: flex;
  align-items: center;
  height: 150px;
  align-content: center;
  position: relative;
`;

export const MainSection1 = styled.div`
  display: inline-flex;
  margin: 80px 0px;
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

// 그래프 ----------------------------------------------------------------------------------------
export const GraphContainer = styled.div`
  width: 400px;
`;

// 탭 ----------------------------------------------------------------------------------------
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
  margin-top: 40px;
  text-align: center;
`;

export const TrackingPlusButtonContainer = styled.div`
  margin-bottom: 60px;
`;
