import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  height: 100px;
  width: 100%;
  /* display: flex; */
  background-color: #e9e9e9;

  padding-top: 40px;

  /* justify-content: center;
  align-items: center; */
  font-size: 1rem;
  font-weight: bold;
  color: #a4a4a4;
  text-align: center;

  z-index: 1000;
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
