import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import avocado from '../lottie/avocado.json';
import Lottie from 'react-lottie';
// import { UserStateContext } from '../App';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atoms';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { throttle } from 'lodash';

import './HeaderStyle.css';

import HeaderHamburger from './HeaderHamburger';

// const Container = styled.div`
//   position: sticky;
//   height: 100px;
//   width: 100vw;
//   background-color: transparent;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   z-index: 3000;
//   top: 0;
// `;

const Logo = styled.h3`
  font-family: 'Jost', sans-serif;
  font-weight: 800;
  font-style: italic;
  width: 50vw;
  font-size: 3rem;
  color: #f03e3e;
  font-style: bold;
  margin: 25px 30px 3px;

  z-index: 3500;
`;

const Avocadobox = styled.div`
  width: auto;
  height: auto;

  margin-left: 1800px;
  position: absolute;
`;

function Header() {
  const user = useRecoilValue(userInfoState);
  // const params = useParams();
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', throttle(updateScroll, 300));
    return () => {
      window.removeEventListener('scroll', throttle(updateScroll, 300));
    };
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: avocado,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // console.log('로그인 유저', user);
  return (
    <>
      <header className={scrollPosition < 80 ? 'mainHeader' : 'ver2'}>
        <Logo>
          <Link to="/" style={{ textDecoration: 'none', color: '#f03e3e', cursor: 'pointer' }}>
            Catch Calories
          </Link>
        </Logo>

        {user ? (
          <>
            <HeaderHamburger />
          </>
        ) : (
          <Avocadobox>
            <Lottie options={defaultOptions} height={100} width={100} />
          </Avocadobox>
        )}
      </header>
    </>
  );
}

export default Header;
