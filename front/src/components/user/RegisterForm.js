import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';

// Mui
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import { validateEmail } from '../../utils';

//styled Compo
import { ValidationTextField, ColorButton, ColorButtonB } from '../styledCompo/uesrStyle';

//Compo
import Header from '../Header';
import Footer from '../Footer';

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');
  //useState로 name 상태를 생성함.
  const [name, setName] = useState('');
  //useState로 gender 상태를 생성함.
  const [gender, setGender] = useState('male');
  //useState로 height 상태를 생성함.
  const [height, setHeight] = useState('');
  //useState로 weight 상태를 생성함.
  const [weight, setWeight] = useState('');
  //useState로 icon 상태를 생성함.
  const [icon, setIcon] = useState('runner');

  // ------------ EMAIL AUTHENTICATION ------------
  const [code, setCode] = useState('');
  const [resCode, setResCode] = useState('');
  const reqCode = async () =>
    setResCode(await Api.get(`users/email/${email}`).then((data) => data.data));
  const isEmailAuthed = resCode === code;

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  // 공백이나 숫자인지 여부를 확인함.
  const isHeightValid = Number(height) > 0 && height.length > 0;
  // 공백이나 숫자인지 여부를 확인함.
  const isWeightValid = Number(weight) > 0 && weight.length > 0;

  // 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isHeightValid &&
    isWeightValid &&
    isEmailAuthed;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(
        `%c이메일: ${email}, 비번: ${password}, 닉넴: ${name}, 성별: ${gender}, 키: ${height}, 몸무게: ${weight} 아이콘 ${icon}`,
        'color: #94D82D;',
      );
      // "user/register" 엔드포인트로 post요청함.
      await Api.post('users/register', {
        email,
        password,
        name,
        gender,
        height: Number(height),
        weight: Number(weight),
        icon,
      });

      // 로그인 페이지로 이동함.
      navigate('/login');
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
    }
  };

  return (
    <>
      <Header></Header>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
          marginTop: 50,
        }}
      >
        <form
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
          <h1 style={{ margin: 10 }}>Register</h1>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '600px' },
            }}
            noValidate
            autoComplete="off"
          >
            <ValidationTextField
              autoFocus
              required
              // error={!checkLogin}
              id="outlined-required"
              label="Email Address"
              autoComplete="email"
              helperText={!isEmailValid && <span>The email format is not valid.</span>}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // setCheckLogin(true);
              }}
              // defaultValue="Hello World"
            />
            <button style={{ width: 55, height: 55 }} onClick={reqCode}>
              Email Auth
            </button>
            <input
              onChange={(e) => {
                e.preventDefault();
                setCode(e.target.value);
              }}
            />
            <br></br>
            <ValidationTextField
              required
              // error={!checkLogin}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              helperText={!isPasswordValid && <span> Password is more than 4 characters. </span>}
              onChange={(e) => {
                setPassword(e.target.value);
                // setCheckLogin(true);
              }}
            />
            <br></br>
            <ValidationTextField
              required
              // error={!checkLogin}
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              value={confirmPassword}
              helperText={!isPasswordSame && <span> Passwords do not match. </span>}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // setCheckLogin(true);
              }}
            />
            <br></br>
            <ValidationTextField
              required
              // {!checkLogin && error}
              // error={!checkLogin}
              label="Nick Name"
              // autoComplete="email"
              helperText={
                !isNameValid && <span>Please set the nickname at least 2 characters.</span>
              }
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                // setCheckLogin(true);
              }}
              // defaultValue="Hello World"
            />
            <br></br>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
              <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
            </RadioGroup>
            <ValidationTextField
              required
              // {!checkLogin && error}
              // error={!checkLogin}
              label="Height"
              // autoComplete="email"
              helperText={
                !isHeightValid && <span>Please enter a number only.(The unit is feet.)</span>
              }
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                // setCheckLogin(true);
              }}
              // defaultValue="Hello World"
            />
            <br></br>
            <ValidationTextField
              required
              // {!checkLogin && error}
              // error={!checkLogin}
              label="Weight"
              // autoComplete="email"
              helperText={
                !isWeightValid && <span>Please enter a number only.(The unit is pounds.)</span>
              }
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                // setCheckLogin(true);
              }}
              // defaultValue="Hello World"
            />
            <br></br>
          </Box>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '600px' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel id="demo-row-radio-buttons-group-label">Badges</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <FormControlLabel
                value="all-rounder"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/all.png" alt="all" style={{ width: 100 }}></img>}
              />
              <FormControlLabel
                value="weight"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/weight.png" alt="all" style={{ width: 100 }}></img>}
              />
              <FormControlLabel
                value="yoga"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/yoga.png" alt="all" style={{ width: 100 }}></img>}
              />
              <FormControlLabel
                value="runner"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/runner.png" alt="all" style={{ width: 100 }}></img>}
              />
            </RadioGroup>
            <Stack
              spacing={1}
              direction="row"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <ColorButton variant="contained" type="submit" disabled={!isFormValid}>
                Sign-up
              </ColorButton>
              <ColorButton variant="contained" onClick={() => navigate('/login')}>
                Sign-in
              </ColorButton>
              <ColorButtonB variant="outlined" onClick={() => navigate('/')}>
                Start Page
              </ColorButtonB>
            </Stack>
          </Box>
        </form>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default RegisterForm;
