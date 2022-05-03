import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import MainButton from '../main/style/MainButton.js';

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
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FirstPageLogo = styled.div`
  font-size: 8rem;
  color: #94d82d;
  font-style: bold;
  padding-bottom: 100px;
`;

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
  width: 400px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 35px;

  font-size: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SecondPageRight = styled.div`
  width: 750px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 24px 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);

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
  width: 750px;
  height: 407px;
  box-sizing: border-box;
  padding: 28px 24px 0;

  border-radius: 14px;
  background: #ecf8d9;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  font-size: 2rem;
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

  border-radius: 14px;
  background: #ecf8d9;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  font-size: 2rem;
  border: none;
`;

const FifthPage = styled.section`
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

const FifthPageBtn = styled.button`
  width: 500px;
  height: 168px;
  border-radius: 10px;
  background: linear-gradient(145deg, #aaeb47, #8fc63b);

  font-size: 5rem;
  color: white;
  border: none;

  :hover {
    box-shadow: 5px 5px 18px #668d2a, -5px -5px 18px #d8ff5a;
  }
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
            style={{ width: '20vw', height: '10vh', borderRadius: '25px', fontSize: '2.5rem' }}
          >
            START
          </MainButton>
        </FirstPageWrapper>
      </FirstPage>
      <SecondPage>
        <SecondPageLeft>
          The more obese people are, the more people do not monitor calories.
        </SecondPageLeft>
        <SecondPageRight>
          <DefaultBarChart
            data={[
              { name: 'Underweight', SCC: '250' },
              { name: 'Normal', SCC: '280' },
              { name: 'Overweight', SCC: '580' },
              { name: 'Obesity', SCC: '980' },
            ]}
            colors={COLORS}
          ></DefaultBarChart>
        </SecondPageRight>
      </SecondPage>
      <ThirdPage>
        <ThirdPageLeft>
          <DefaultLineChart />
        </ThirdPageLeft>
        <ThirdPageRight>People who do less physical activity have a high BMI index </ThirdPageRight>
      </ThirdPage>
      <FourthPage>
        <FourthPageLeft>
          The United States has a relatively high obesity rate compared to other countries, and the
          increase is also on the rise.
        </FourthPageLeft>
        <FourthPageRight>
          <DefaultObesityLineChart colors={COLORS}></DefaultObesityLineChart>
        </FourthPageRight>
      </FourthPage>
      <FifthPage>
        <FifthPageCopy>
          Track your calories with Catch Calories
          <Lottie options={defaultOptions} height={470} width={470} />
          <FifthPageBtn onClick={() => navigate('/login', { replace: true })}>START</FifthPageBtn>
        </FifthPageCopy>
      </FifthPage>

      <Footer />
    </>
  );
}

export default Home;
