import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

// Mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import * as Api from '../../api';
import Header from '../Header';
import Footer from '../Footer';
import { validateEmail } from '../../utils';
// import recoil
import { useSetRecoilState } from 'recoil';
import { tokenState, userState } from '../../atoms';

// import styled compo
import { ValidationTextField, ColorButton, ColorButtonB } from '../styledCompo/muiCustom';
import {
  LoginGlass,
  TitleText,
  ForgetPw,
  SignPWContainer,
  SignBtn,
  SignInBtn,
  Btn,
  CatchBack,
  CaloriesBack,
  GitHubBtn,
  Separator,
} from '../styledCompo/LoginStyle';
import githubLogin from './GithubLogin';
import { fontSize } from '@mui/system';

function LoginForm() {
  const navigate = useNavigate();

  ///@ 전역 유저 정보
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  ///@ 상태
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  // input 상태관리
  const [checkLogin, setCheckLogin] = useState(true);

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  ///@ 로그인 시 작동하는 함수(post 요청)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post('users/login', {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem('userToken', jwtToken);

      console.log(user);
      setToken(user.token);
      setUser(user);

      // 기본 페이지로 이동함.
      navigate(`/tracking/${user.id}`, { replace: true });
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
      alert('Login failed');
      setCheckLogin(false);
    }
  };

  // 깃헙 로그인 요청
  const githubLogin = () => {
    const base = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_GITHUB_ID,
      scope: 'read:user user:email',
    }).toString();
    const url = `${base}?${params}`;
    return (window.location.href = url);
  };

  return (
    <div>
      {/* ///@ 백그라운드 글자 */}
      <CatchBack>Catch</CatchBack>
      <CaloriesBack>Calories</CaloriesBack>
      <Header></Header>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 400,
          marginBottom: 400,
        }}
      >
        <LoginGlass>
          <form
            action="/"
            onSubmit={handleSubmit}
            style={{
              marginTop: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column',
            }}
          >
            {/* ///@ 타이틀 */}
            <TitleText>Login</TitleText>
            <Box
              sx={{
                width: '438px',
              }}
              noValidate
              autoComplete="off"
            >
              {/* ///@ 이메일 input */}
              <ValidationTextField
                style={{ width: 438, marginBottom: 10 }}
                autoFocus
                // {!checkLogin && error}
                error={!checkLogin}
                id="outlined-required"
                label="Email Address"
                autoComplete="email"
                helperText={
                  (!isEmailValid && <span>The email format is not valid.</span>) ||
                  (!checkLogin && <span>Invalid email.</span>)
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCheckLogin(true);
                }}
                // defaultValue="Hello World"
              />
              <br></br>
              {/* ///@ 비밀번호 input */}
              <ValidationTextField
                style={{ width: 438 }}
                error={!checkLogin}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                helperText={
                  (!isPasswordValid && <span> Password is more than 4 characters. </span>) ||
                  (!checkLogin && <span>Invalid password.</span>)
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCheckLogin(true);
                }}
              />
              <br></br>
              {/* <Button color="success" onClick={() => navigate('/password/init')}>
                Forget Password?
              </Button> */}
              {/* ///@ 회원가입버튼 & 비밀번호 찾끼 */}
              <SignPWContainer>
                <ForgetPw
                  sx={{ fontSize: 16 }}
                  color="success"
                  onClick={() => navigate('/password/init')}
                >
                  Forget Password?
                </ForgetPw>
                <SignBtn
                  sx={{ fontSize: 16 }}
                  color="success"
                  onClick={() => navigate('/register')}
                >
                  Sign-up
                </SignBtn>
              </SignPWContainer>
              {/* ///@ 버튼들 */}
              <Stack
                spacing={1}
                direction="row"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <ColorButton variant="contained" type="submit" disabled={!isFormValid}>
                  Sign-in
                </ColorButton>

                <ColorButtonB variant="outlined" onClick={() => navigate('/')}>
                  Back
                </ColorButtonB>
                {/* <button
                  style={{
                    borderRadius: '17px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    // backgroundColor: '#94D82D',
                    background: 'linear-gradient(180deg, #A8E054 100%, #99DA36 100%)',
                    borderImage: 'linear-gradient(to right, red 0%, orange 100%)',
                    borderImageSlice: 1,
                    color: '#F03E3E',
                    height: '46px',
                  }}
                >
                  qjxms
                </button>
                <Btn>djjd</Btn> */}
              </Stack>
            </Box>
          </form>

          <Box
            sx={{
              width: '438px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexFlow: 'column',
            }}
          >
            <Separator />
            {/* ///@ 깃헙버튼 */}
            <GitHubBtn onClick={githubLogin}>😺&nbsp;&nbsp;Sign in with GitHub</GitHubBtn>
          </Box>
        </LoginGlass>
        {/* <Footer></Footer> */}
      </Container>
    </div>
  );
}

export default LoginForm;
