import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';
import Header from '../Header';
import Footer from '../Footer';

import video from '../../image/mainvideo_edit.mp4';

import DefaultLineChart from '../DefaultLineChart.js';
import DefaultBarChart from '../DefaultBarChart.js';
import DefaultObesityLineChart from '../DefaultObesityLineChart.js';

import Walking from '../../lottie/walking.json';

import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

//HomeStyled 파일 모두 가져오기
import * as HS from '../styledCompo/homeStyle';

const COLORS = ['#5bc691', '#FFBB28', '#C66868', '#FF8042'];

function Home() {
  const navigate = useNavigate();

  // const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const user = useRecoilValue(userInfoState);

  // const userId = user._id;
  // console.log('id', userId);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Walking,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  // {user ? (
  //   <Logo>
  //     <Link
  //       to={{ pathname: `/tracking/${user._id}` }} // 로그인 되어있을 시 로그인 된 유저의 메인페이지로 이동
  //       style={{ textDecoration: 'none', color: '#f03e3e', cursor: 'pointer' }}
  //     >
  //       Catch Calories
  //     </Link>
  //   </Logo>
  // )
  return (
    <>
      <Header />

      <HS.FirstPage>
        <HS.VideoContainer>
          <HS.Video muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </HS.Video>
        </HS.VideoContainer>
        <HS.FirstPageWrapper>
          <HS.FirstPageLogo>Catch Calories</HS.FirstPageLogo>
          {user ? (
            <HS.StartButton
              onClick={() => navigate(`/tracking/${user._id}`, { replace: true })}
              variant="contained"
              style={{
                width: '20vw',
                height: '10vh',
                borderRadius: '25px',
                fontSize: '2.5rem',
              }}
            >
              START
            </HS.StartButton>
          ) : (
            <HS.StartButton
              onClick={() => navigate('/login', { replace: true })}
              variant="contained"
              style={{
                width: '20vw',
                height: '10vh',
                borderRadius: '25px',
                fontSize: '2.5rem',
              }}
            >
              Start
            </HS.StartButton>
          )}
        </HS.FirstPageWrapper>
      </HS.FirstPage>
      <HS.CircleRed1 />
      <HS.CircleGreen1 />
      <HS.SecondPage>
        <HS.SecondPageLeft>
          <HS.HeadCopy>
            <span style={{ color: ' #e85858' }}>USA Obesity Rate </span>is on the{' '}
            <span style={{ color: '#77b63e' }}>Rise</span>
          </HS.HeadCopy>
          <HS.BodyCopy>
            <HS.HeadCopy2>
              <span style={{ color: '#77b63e' }}>'CDC says'&nbsp;</span>{' '}
              <span style={{ color: ' #e85858' }}>more Americans on diets</span>&nbsp;compared to a
              decade ago'&nbsp;
            </HS.HeadCopy2>
            <HS.HeadCopy3 style={{ fontSize: '0.8rem' }}>-NBC NEWS-</HS.HeadCopy3>
            <br />
            The rising obesity rate is not just a problem for the USA. &nbsp;It's becoming a{' '}
            <span style={{ color: '#e85858' }}>global issue.</span>
          </HS.BodyCopy>
        </HS.SecondPageLeft>
        <HS.SecondPageRight>
          <DefaultObesityLineChart colors={COLORS}></DefaultObesityLineChart>
        </HS.SecondPageRight>
      </HS.SecondPage>
      <HS.ThirdPage>
        <HS.ThirdPageLeft>
          <HS.GraphCopy>
            {' '}
            The more <span style={{ color: '#77b63e' }}>obese people</span> are, <br />
            the more people <span style={{ color: '#e85858' }}>don't monitor their calories!</span>
          </HS.GraphCopy>
          {/* <DefaultObesityLineChart colors={COLORS}></DefaultObesityLineChart> */}
          <DefaultBarChart
            data={[
              { name: 'Underweight', SCC: '250' },
              { name: 'Normal', SCC: '280' },
              { name: 'Overweight', SCC: '580' },
              { name: 'Obesity', SCC: '980' },
            ]}
            colors={COLORS}
          ></DefaultBarChart>
        </HS.ThirdPageLeft>
        <HS.ThirdPageRight>
          <HS.HeadCopy>
            Correlation between <br />
            <span style={{ color: '#77b63e' }}>calorie monitoring</span> and{' '}
            <span style={{ color: '#e85858' }}>obesity levels</span>
          </HS.HeadCopy>{' '}
          <HS.BodyCopy>
            Calorie monitoring can lower your obesity level.
            <br />
            Of the 2,000 people randomly selected, <br />
            1,000 people did not monitor their income calories.
          </HS.BodyCopy>
        </HS.ThirdPageRight>
      </HS.ThirdPage>
      <HS.FourthPage>
        <HS.CircleRed2 />
        <HS.CircleGreen2 />
        <HS.FourthPageLeft>
          <HS.HeadCopy>
            Correlation between <br />
            <span style={{ color: '#77b63e' }}>BMI index</span> and{' '}
            <span style={{ color: '#e85858' }}>physical activity</span>
          </HS.HeadCopy>
          <HS.BodyCopy>
            The higher the BMI index, the lower the frequency of physical activity.
            <br />
            High obesity people don't do physical activity at all.
          </HS.BodyCopy>
        </HS.FourthPageLeft>
        <HS.FourthPageRight>
          <HS.GraphCopy>
            {' '}
            <span
              style={{
                color: '#e85858',
              }}
            >
              Frequency of physical activity
            </span>
            &nbsp;of high obesity
            <br />
            which BMI index is <span style={{ color: '#77b63e' }}>30 to 32 is Zero!</span>
          </HS.GraphCopy>
          <DefaultLineChart />
        </HS.FourthPageRight>
      </HS.FourthPage>
      <HS.FifthPage>
        <HS.FifthPageCopy>
          <span>
            Monitor calories with{' '}
            <span style={{ color: '#77b63e' }}>
              Catch Calories <br />
            </span>
          </span>
          <span style={{ color: '#f03e3e', fontSize: '4rem' }}>
            for your <span style={{ color: '#77b63e' }}>Eating & Workout routine!</span>
          </span>
          <Lottie options={defaultOptions} height={470} width={470} />
          <HS.StartButton
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
          </HS.StartButton>
        </HS.FifthPageCopy>
      </HS.FifthPage>
    </>
  );
}

export default Home;
