import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

import BarChart from '../DefaultBarChart.js';
import LineChart from '../DefaultLineChart.js';

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
	background-color: white;
	border: 1px solid #f0f1f3;
	border-radius: 8px;
	width: 400px;
	height: 407px;
	box-sizing: border-box;
	padding: 28px 35px 0;

	font-size: 2rem;
`;

const SecondPageRight = styled.div`
	border-radius: 8px;
	width: 750px;
	height: 407px;
	box-sizing: border-box;
	padding: 28px 24px 0;

	border-radius: 0px;
	background: #ecf8d9;
	box-shadow: inset 6px 6px 12px #cdd8bd, inset -6px -6px 12px #fffff5;
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

const ThirdPageRight = styled.div`
	background-color: white;
	border: 1px solid #f0f1f3;
	border-radius: 8px;
	width: 400px;
	height: 407px;
	box-sizing: border-box;
	padding: 28px 35px 0;

	font-size: 2rem;
`;

const ThirdPageLeft = styled.div`
	border-radius: 8px;
	width: 750px;
	height: 407px;
	box-sizing: border-box;
	padding: 28px 24px 0;

	border-radius: 0px;
	background: #ecf8d9;
	box-shadow: inset 6px 6px 12px #cdd8bd, inset -6px -6px 12px #fffff5;
	font-size: 2rem;
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
	padding: 300px;
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
	return (
		<>
			<Header />
			<FirstPage>
				<FirstPageLogo>Catch Calories</FirstPageLogo>
				<FirstPageBtn>START</FirstPageBtn>
			</FirstPage>
			<SecondPage>
				<SecondPageLeft>비만일 수록 칼로리 모니터링을 하지 않는 사람들이 많다.</SecondPageLeft>
				<SecondPageRight>
					<BarChart />
				</SecondPageRight>
			</SecondPage>
			<ThirdPage>
				<ThirdPageLeft>
					<LineChart />
				</ThirdPageLeft>
				<ThirdPageRight>신체활동을 적게 하는 사람일수록 비만도가 높다.</ThirdPageRight>
			</ThirdPage>
			<FourthPage>
				<FourthPageCopy>Catch Calories에서 칼로리 트래킹하세요</FourthPageCopy>
				<FourthPageBtn>START</FourthPageBtn>
			</FourthPage>
			<Footer />
		</>
	);
}

export default Home;
