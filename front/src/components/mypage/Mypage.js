import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Jandi from './Jandi.js';
import Badges from './Badges.js';

const JandiPage = styled.section`
  height: 60vh;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const BadgesPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function Mypage() {
  return (
    <>
      <Header />
      <BadgesPage>
        <Badges />
      </BadgesPage>
      <JandiPage>
        <Jandi />
      </JandiPage>

      <Footer />
    </>
  );
}

export default Mypage;
