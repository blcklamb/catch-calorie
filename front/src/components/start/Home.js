import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import Header from '../Header';
import Footer from '../Footer';

import DefaultLineChart from '../DefaultLineChart.js';
import { DefaultBarChart } from '../DefaultBarChart.js';

import Walking from '../../lottie/walking.json';

import { useNavigate } from 'react-router-dom';
import { UserStateContext } from '../../App';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

const FirstPage = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FirstPageLogo = styled.div`
  font-size: 8rem;
  color: #f03e3e;
  font-style: bold;
  margin-bottom: 50px;
`;

const FirstPageBtn = styled.button`
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

  border-radius: 14px;
  background: #ecf8d9;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  font-size: 2rem;
  border: none;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7fcef;
`;

const FourthPageCopy = styled.div`
  font-size: 4rem;
  color: #f03e3e;
  font-style: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding-top: 50px;
`;

const FourthPageBtn = styled.button`
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
        <FirstPageLogo>Catch Calories</FirstPageLogo>
        <FirstPageBtn onClick={() => navigate('/login', { replace: true })}>START</FirstPageBtn>
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
        <FourthPageCopy>
          Track your calories with Catch Calories
          <Lottie options={defaultOptions} height={470} width={470} />
          <FourthPageBtn onClick={() => navigate('/login', { replace: true })}>START</FourthPageBtn>
        </FourthPageCopy>
      </FourthPage>
      <Footer />
    </>
  );
}

export default Home;
