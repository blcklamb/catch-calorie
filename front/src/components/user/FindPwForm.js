import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

// Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import * as Api from '../../api';
// import { DispatchContext } from '../../App';
import Header from '../Header';
import Footer from '../Footer';
import { validateEmail } from '../../utils';
// import recoil
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../../atoms';

// import styled compo
import { ValidationTextField, ColorButton, ColorButtonB } from '../styledCompo/uesrStyle';

function LoginForm() {
  const [email, setEmail] = useState('');
  const isEmailValid = validateEmail(email);
  const [sentEmail, setSentEmail] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.put('password/init', {
      email,
    });

    const temp = res.data;
    console.log(temp, '이메일이 정상적으로 전송되었습니다.');
    alert('Temporary password sent successfully.');
    navigate('/login', { replace: true });

    setEmail('');
    try {
    } catch (err) {
      setSentEmail(false);
      alert('이메일이 정상적으로 전송되지 못했습니다.');
    }
  };

  return (
    <div>
      <Header></Header>
      <Container
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
      >
        <div>
          <form
            action="/"
            onSubmit={handleSubmit}
            style={{
              marginTop: 100,
              marginBottom: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column',
            }}
          >
            <h1 style={{ margin: 10 }}>Find Password</h1>
            <Box
              sx={{
                '& > :not(style)': { m: 1, width: '34ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <ValidationTextField
                autoFocus
                required
                // {!checkLogin && error}
                error={!sentEmail}
                id="outlined-required"
                label="Email Address"
                autoComplete="email"
                helperText={
                  (!isEmailValid && <span>The email format is not valid.</span>) ||
                  (!sentEmail && <span>Invalid email.</span>)
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSentEmail(true);
                }}
                // defaultValue="Hello World"
              />
              <br></br>
              <Stack
                spacing={1}
                direction="row"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <ColorButton
                  variant="contained"
                  type="submit"
                  disabled={!isEmailValid}
                  onClick={handleSubmit}
                >
                  Send a temporary PW
                </ColorButton>
                <ColorButtonB variant="outlined" onClick={() => navigate(-1)}>
                  back
                </ColorButtonB>
              </Stack>
            </Box>
          </form>
          {/* <form onSubmit={handleSubmit}>
            <div>
              <label>이메일 주소</label>
              <input
                type="email"
                autoComplete="on"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {!isEmailValid && <p>이메일 형식이 올바르지 않습니다.</p>}
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                autoComplete="on"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {!isPasswordValid && <p> 비밀번호는 4글자 이상입니다. </p>}
            <button type="submit" disabled={!isFormValid}>
              로그인
            </button>
            <button onClick={() => navigate('/register')}>회원가입하기</button>
          </form> */}
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default LoginForm;
