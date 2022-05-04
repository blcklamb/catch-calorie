import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';
import Header from '../Header';
import Footer from '../Footer';

import video from '../../image/mainvideo_edit.mp4';

import DefaultLineChart from '../DefaultLineChart.js';
import { DefaultBarChart } from '../DefaultBarChart.js';
import DefaultObesityLineChart from '../DefaultObesityLineChart.js';

import Walking from '../../lottie/walking.json';

import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

const FirstPage = styled.section`
  height: 100vh;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const VideoContainer = styled.div`
  width: 100%;
  display: block;
  position: relative;
  z-index: 400;

  &:before {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.3;
    position: absolute;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;

  &:before {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.5;
    position: absolute;
  }
`;

const FirstPageWrapper = styled.div`
  position: absolute;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 200px;
`;

const FirstPageLogo = styled.div`
  font-size: 8rem;
  color: #94d82d;
  font-style: bold;
  padding-bottom: 200px;
  padding-top: 20px;
`;

const MainButton = styled(Button)({
  background: 'linear-gradient(45deg, #F03E3E 30%, #F03E3E 90%)',
  border: 0,
  borderRadius: 20,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
});

const SecondPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #f7fcef;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SecondPageLeft = styled.div`
  /* background-color: white; */
  /* border: 1px solid #f0f1f3;
  border-radius: 8px; */

  width: 450px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 35px;

  font-size: 1.5rem;

  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const SecondPageLeftHeadCopy = styled.div`
  /* background-color: white; */
  margin-bottom: 50px;
  font-size: 2.7rem;
  color: #373737;
  line-height: 40px;
  font-weight: bold;
`;

const SecondPageLeftBodyCopy = styled.div`
  /* background-color: yellow; */
  line-height: 30px;
`;

const SecondPageRight = styled.div`
  z-index: 400;
  width: 750px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 24px 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  border-radius: 40px;
`;

const ThirdPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ThirdPageLeft = styled.div`
  z-index: 400;
  width: 750px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 24px 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  border-radius: 40px;

  /* font-size: 5rem; */
  border: none;
`;

const ThirdPageRight = styled.div`
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  width: 400px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 35px;

  font-size: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
`;

const FourthPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #f7fcef;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const FourthPageLeft = styled.div`
  /* background-color: white; */
  /* border: 1px solid #f0f1f3;
  border-radius: 8px; */
  width: 400px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 35px;

  font-size: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FourthPageRight = styled.div`
  width: 750px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 24px 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  border-radius: 40px;

  /* font-size: 5rem; */
  border: none;
`;

const FifthPage = styled.section`
  position: relative;
  z-index: 400;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ecf8d9;
`;

const FifthPageCopy = styled.div`
  font-size: 4rem;
  color: #f03e3e;
  font-style: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding-top: 50px;
`;

const CircleRed1 = styled.div`
  position: absolute;
  z-index: 300;
  width: 470.49px;
  height: 470.49px;
  left: 1589px;
  top: 1000.51px;
  border-radius: 50%;
  background: radial-gradient(
      87.63% 87.63% at 30.82% 78.65%,
      #c62e2e 0%,
      #e44545 29.02%,
      #f39999 69.13%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CircleGreen1 = styled.div`
  position: absolute;

  right: -55px;
  z-index: 300;
  width: 700px;
  height: 700px;
  left: -330.39px;
  top: 1800px;
  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    rgba(105, 156, 29, 0.9) 0%,
    #77bb41 29.02%,
    #d6eeb1 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const CircleRed2 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  left: 830.75px;
  top: 3079.47px;

  border-radius: 50%;
  background: radial-gradient(
      87.63% 87.63% at 30.82% 78.65%,
      #c62e2e 0%,
      #e44545 29.02%,
      #f39999 69.13%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const CircleGreen2 = styled.div`
  position: absolute;

  width: 700px;
  height: 700px;
  left: 600px;
  top: 3500px;
  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    rgba(105, 156, 29, 0.9) 0%,
    #77bb41 29.02%,
    #d6eeb1 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function Home() {
  const navigate = useNavigate();

  const user = useRecoilValue(userState);

  console.log(user);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Walking,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Header />

      <FirstPage>
        <VideoContainer>
          <Video muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </Video>
        </VideoContainer>
        <FirstPageWrapper>
          <FirstPageLogo>Catch Calories</FirstPageLogo>
          <MainButton
            onClick={() => navigate('/login', { replace: true })}
            variant="contained"
            style={{
              width: '20vw',
              height: '10vh',
              borderRadius: '25px',
              fontSize: '2.5rem',
            }}
          >
            START
          </MainButton>
        </FirstPageWrapper>
      </FirstPage>
      <CircleRed1 />
      <CircleGreen1 />
      <SecondPage>
        <SecondPageLeft>
          <SecondPageLeftHeadCopy>
            <span style={{ color: ' #e85858' }}>U.S.A Obesity Rate </span>is on the{' '}
            <span style={{ color: '#77b63e' }}>Rise</span>
          </SecondPageLeftHeadCopy>
          <SecondPageLeftBodyCopy>
            The rising obesity rate is <br />
            not just a problem for the USA. <br />
            It's becoming a <span style={{ color: '#77b63e' }}>global issue.</span>
          </SecondPageLeftBodyCopy>
        </SecondPageLeft>
        <SecondPageRight>
          <DefaultObesityLineChart colors={COLORS}></DefaultObesityLineChart>
        </SecondPageRight>
      </SecondPage>
      <ThirdPage>
        <ThirdPageLeft>
          <DefaultLineChart />
        </ThirdPageLeft>
        <ThirdPageRight>People who do less physical activity have a high BMI index </ThirdPageRight>
      </ThirdPage>
      <FourthPage>
        <CircleRed2 />
        <CircleGreen2 />
        <FourthPageLeft>
          The United States has a relatively high obesity rate compared to other countries, and the
          increase is also on the rise.
        </FourthPageLeft>
        <FourthPageRight>
          <DefaultBarChart
            data={[
              { name: 'Underweight', SCC: '250' },
              { name: 'Normal', SCC: '280' },
              { name: 'Overweight', SCC: '580' },
              { name: 'Obesity', SCC: '980' },
            ]}
            colors={COLORS}
          ></DefaultBarChart>
        </FourthPageRight>
      </FourthPage>
      <FifthPage>
        <FifthPageCopy>
          Track your calories with Catch Calories
          <Lottie options={defaultOptions} height={470} width={470} />
          <MainButton
            onClick={() => navigate('/login', { replace: true })}
            variant="contained"
            style={{
              width: '20vw',
              height: '10vh',
              borderRadius: '25px',
              fontSize: '2.5rem',
            }}
          >
            START
          </MainButton>
        </FifthPageCopy>
      </FifthPage>

      <Footer />
    </>
  );
}

export default Home;
