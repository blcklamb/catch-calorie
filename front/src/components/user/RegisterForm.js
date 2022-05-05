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
import { RedSpan } from '../styledCompo/styledCompo';
import { ValidationTextField, ColorButton, ColorButtonB } from '../styledCompo/muiCustom';

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
  const [icon, setIcon] = useState(
    'https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_1.png',
  );

  // ------------ EMAIL AUTHENTICATION ------------
  const [code, setCode] = useState('임시비밀번호가 들어오는 곳이랍니다.');
  const [resCode, setResCode] = useState('');
  const reqCode = async () => {
    alert('Your email verification number has been successfully sent to your email.');
    return setResCode(await Api.get(`users/email/${email}`).then((data) => data.data));
  };
  // 임시 비밀번호를 알고싶나요?
  // console.log(resCode);
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
            autoComplete="off"
          >
            <ValidationTextField
              autoFocus
              required
              // error={!checkLogin}
              id="outlined-required"
              label="Email Address"
              autoComplete="email"
              helperText={!isEmailValid && <RedSpan>The email format is not valid.</RedSpan>}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // setCheckLogin(true);
              }}
              // defaultValue="Hello World"
            />
            <br></br>
            <ColorButton onClick={reqCode}>Email Authentication</ColorButton>
            <br></br>
            <ValidationTextField
              // error={!isEmailAuthed}
              size="small"
              helperText={
                !isEmailAuthed && <RedSpan> The authentication number is invalid. </RedSpan>
              }
              placeholder="Please enter the authentication number after receiving the email verification."
              onChange={(e) => {
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
              helperText={
                !isPasswordValid && <RedSpan> Password is more than 4 characters. </RedSpan>
              }
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
              helperText={!isPasswordSame && <RedSpan> Passwords do not match. </RedSpan>}
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
                !isNameValid && <RedSpan>Please set the nickname at least 2 characters.</RedSpan>
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
                !isHeightValid && <RedSpan>Please enter a number only.(The unit is feet.)</RedSpan>
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
                !isWeightValid && (
                  <RedSpan>Please enter a number only.(The unit is pounds.)</RedSpan>
                )
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
                value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_1.png"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/first_badge_1.png" alt="all" style={{ width: 100 }}></img>}
              />
              <FormControlLabel
                value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_2.png"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/first_badge_2.png" alt="all" style={{ width: 100 }}></img>}
              />
              <FormControlLabel
                value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_3.png"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/first_badge_3.png" alt="all" style={{ width: 100 }}></img>}
              />
              <FormControlLabel
                value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_4.png"
                labelPlacement="bottom"
                control={<Radio color="success" />}
                label={<img src="/first_badge_4.png" alt="all" style={{ width: 100 }}></img>}
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
