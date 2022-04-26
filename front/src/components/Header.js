import React from 'react';
import styled from 'styled-components';
import avocado from '../image/avocado.gif';

const Container = styled.div`
	position: fixed;
	height: 100px;
	width: 100vw;
	background-color: #9fdc42;
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 3000;
	top: 0;
`;

const Logo = styled.h3`
	font-size: 2.9rem;
	color: #f03e3e;
	font-style: bold;
	margin: 15px 30px -5px;
`;

const LogoCopy = styled.div`
	font-size: 1rem;
	color: white;
	font-style: bold;
	margin-left: 35px;
	margin-bottom: 10px;
`;

const Avocadobox = styled.div`
	width: 100vw;
	height: 100px;
	display: flex;
	justify-content: flex-end;
	flex-direction: inline;
	align-items: center;
	position: absolute;
`;
const Avocado = styled.img`
	width: 100px;
	height: 100px;
	margin: 15px;
`;

function Header() {
	return (
		<>
			<Container>
				<Logo>Catch Carlories</Logo>
				<LogoCopy>health tracker</LogoCopy>
				<Avocadobox>
					<Avocado src={avocado} />
				</Avocadobox>
			</Container>
		</>
	);
}

export default Header;
