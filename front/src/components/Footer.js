import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 100px;
	width: auto;
	background-color: #e9e9e9;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: bold;
	color: #a4a4a4;
`;

function Footer() {
	return (
		<>
			<Container>
				&copy;{new Date().getFullYear()} CATCH CALORIES | All rights reserved | Terms Of Service |
				Privacy
			</Container>
		</>
	);
}

export default Footer;
