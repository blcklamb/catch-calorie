import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import styled2 from 'styled-components';

import Container from '@mui/material/Container';

// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

export const BodyContainer = styled2.div`
    width: 100%; 

    background: pink;



    align-content: center;
    justify-content: center;
    margin-top: 180px;
    margin-bottom: 180px;
    display: grid;
`;

export const MainHelloSection = styled2.div`
width: 100%;
padding: 20px 20px;

background: yellow;
display: flex;
align-items: center;
    height: 150px;
    align-content: center;
    position: relative;
`;

export const MainSection1 = styled2.div`

display: inline-flex;
margin: 80px 0px;


`;

export const Section = styled2.div`
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
export const GraphContainer = styled2.div`
width: 400px;
`;

// 탭 ----------------------------------------------------------------------------------------
export const TrackingForm = styled2.div`
height: 80px; 
display: flex;
margin: 10px 0;
`;

export const TrackingAutoContainer = styled2.div`
width: 300px;
margin-right: 20px;
`;

export const TrackingTextFieldContainer = styled2.div`
width: 150px;
margin-right: 20px;

component="form"
sx={{
'& > :not(style)': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
`;

export const TrackingSwitchContainer = styled2.div`
  float: right;
  flex-grow: 1;
  text-align: right;

`;

export const TrackingButtonContainer = styled2.div`
width: 100%;


`;

// export const FirstPage = styled.section`
//   height: 100vh;
//   display: flex;

//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const FirstPageWrapper = styled.div`
//   position: absolute;
//   z-index: 500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   padding-top: 200px;
// `;

// const MainButton = styled(Button)({
//   background: 'linear-gradient(45deg, #F03E3E 30%, #F03E3E 90%)',
//   border: 0,
//   borderRadius: 20,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
// });

// const CircleRed1 = styled.div`
//   position: absolute;
//   z-index: 300;
//   width: 470.49px;
//   height: 470.49px;
//   left: 1589px;
//   top: 1000.51px;
//   border-radius: 50%;
//   background: radial-gradient(
//       87.63% 87.63% at 30.82% 78.65%,
//       #c62e2e 0%,
//       #e44545 29.02%,
//       #f39999 69.13%
//     )
//     /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `;

// const CircleGreen1 = styled.div`
//   position: absolute;

//   right: -55px;
//   z-index: 300;
//   width: 700px;
//   height: 700px;
//   left: -330.39px;
//   top: 1800px;
//   border-radius: 50%;
//   background: radial-gradient(
//     87.63% 87.63% at 30.82% 78.65%,
//     rgba(105, 156, 29, 0.9) 0%,
//     #77bb41 29.02%,
//     #d6eeb1 69.13%
//   );
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `;
// const CircleRed2 = styled.div`
//   position: absolute;
//   width: 200px;
//   height: 200px;
//   left: 830.75px;
//   top: 3079.47px;

//   border-radius: 50%;
//   background: radial-gradient(
//       87.63% 87.63% at 30.82% 78.65%,
//       #c62e2e 0%,
//       #e44545 29.02%,
//       #f39999 69.13%
//     )
//     /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `;
// const CircleGreen2 = styled.div`
//   position: absolute;

//   width: 700px;
//   height: 700px;
//   left: 600px;
//   top: 3500px;
//   border-radius: 50%;
//   background: radial-gradient(
//     87.63% 87.63% at 30.82% 78.65%,
//     rgba(105, 156, 29, 0.9) 0%,
//     #77bb41 29.02%,
//     #d6eeb1 69.13%
//   );
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `;
