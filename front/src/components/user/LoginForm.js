import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

// Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { alpha, styled } from '@mui/material/styles';

import * as Api from '../../api';
// import { DispatchContext } from '../../App';
import Header from '../Header';
import Footer from '../Footer';

import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../../atoms';

function LoginForm() {
  const navigate = useNavigate();
  // const dispatch = useContext(DispatchContext);
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  // input 상태관리
  const [checkLogin, setCheckLogin] = useState(true);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

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
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      // console.log(user);
      // dispatch({
      //   type: 'LOGIN_SUCCESS',
      //   payload: user,
      // });
      console.log(user);
      setToken(user.token);
      setUser(user);

      // 기본 페이지로 이동함.
      navigate('/tracking', { replace: true });
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
      setCheckLogin(false);
    }
  };

  return (
    <div>
      <Header></Header>
      <Container
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
      >
        <div>
          <form action="/" onSubmit={handleSubmit} style={{ marginTop: 100, marginBottom: 100 }}>
            <h1 style={{ margin: 10 }}>Login</h1>
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
              <ValidationTextField
                required
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
              <Stack
                spacing={1}
                direction="row"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <ColorButton variant="contained" type="submit" disabled={!isFormValid}>
                  Sign-in
                </ColorButton>
                <ColorButton variant="contained" onClick={() => navigate('/register')}>
                  Sign-up
                </ColorButton>
                <ColorButtonB variant="outlined" onClick={() => navigate('/')}>
                  Start Page
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

    // <Container>
    //   <Row className="justify-content-md-center mt-5">
    //     <Col lg={8}>
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group controlId="loginEmail">
    //           <Form.Label>이메일 주소</Form.Label>
    //           <Form.Control
    //             type="email"
    //             autoComplete="on"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //           {!isEmailValid && (
    //             <Form.Text className="text-success">
    //               이메일 형식이 올바르지 않습니다.
    //             </Form.Text>
    //           )}
    //         </Form.Group>

    //         <Form.Group controlId="loginPassword" className="mt-3">
    //           <Form.Label>비밀번호</Form.Label>
    //           <Form.Control
    //             type="password"
    //             autoComplete="on"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //           {!isPasswordValid && (
    //             <Form.Text className="text-success">
    //               비밀번호는 4글자 이상입니다.
    //             </Form.Text>
    //           )}
    //         </Form.Group>

    //         <Form.Group as={Row} className="mt-3 text-center">
    //           <Col sm={{ span: 20 }}>
    //             <Button variant="primary" type="submit" disabled={!isFormValid}>
    //               로그인
    //             </Button>
    //           </Col>
    //         </Form.Group>

    //         <Form.Group as={Row} className="mt-3 text-center">
    //           <Col sm={{ span: 20 }}>
    //             <Button variant="light" onClick={() => navigate("/register")}>
    //               회원가입하기
    //             </Button>
    //           </Col>
    //         </Form.Group>
    //       </Form>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#94D82D',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: '#699C1D',
    borderWidth: 2,
  },
  '& input:disabled + fieldset': {
    borderColor: '#699C1D',
    borderWidth: 2,
  },
  '& input ': {
    borderColor: '#699C1D',
    borderWidth: 2,
  },
  // '& input:valid:focus + fieldset': {
  // 	borderColor: '#699C1D',
  // 	borderLeftWidth: 6,
  // 	padding: '4px !important', // override inline-style
  // },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: '#9CFD08',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#94D82D'),

  boxShadow: '0px 2px 2px #86C725',
  backgroundColor: '#94D82D',
  color: '#F03E3E',
  '&:hover': {
    backgroundColor: '#94D82D',
    boxShadow: '0px 2px 3px #699C1D',
  },
}));

export const ColorButtonB = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#94D82D'),
  borderColor: '#94D82D',
  color: '#F03E3E',
  '&:hover': {
    // boxShadow: '0px 2px 3px #699C1D',
    backgroundColor: '#FCFFF8',
    borderColor: '#699C1D',
  },
}));

export default LoginForm;
