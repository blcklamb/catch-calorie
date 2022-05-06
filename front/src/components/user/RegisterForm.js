import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';

// Mui
import { Box, Button, ButtonGroup } from '@mui/material';

import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import { validateEmail } from '../../utils';

//Compo
import Header from '../Header';
import Footer from '../Footer';

//styled Compo
import { RedSpan } from '../styledCompo/LoginStyle';
import {
  ValidationTextField,
  ColorButton,
  ColorButtonB,
  SmallButton,
} from '../styledCompo/muiCustom';

import {
  GenderBtn,
  RegisterGlass,
  RegisterTitle,
  RegisterCircleRed1,
  RegisterCircleRed2,
  RegisterCircleGreen1,
  RegisterCircleGreen2,
} from '../styledCompo/RegisterStyle';

function RegisterForm() {
  const navigate = useNavigate();

  ///@ 각 input 상태값
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

  const [code, setCode] = useState('유저가 임시번호를 치면 받아오는 곳이랍니다.');
  const [resCode, setResCode] = useState('임시번호가 할당되는 곳이랍니다.');
  const reqCode = async () => {
    alert('Your email verification number has been successfully sent to your email.');
    return setResCode(await Api.get(`users/email/${email}`).then((data) => data.data));
  };
  ///@ 임시번호를 알고싶나요? 콘솔을 켜시면 됩니당.
  // console.log(resCode);
  const isEmailAuthed = resCode === code;

  ///@ 각 input 유효성 검사
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
  // Check 버튼 상태
  const [checkNum, setCheckNum] = useState('트루');

  ///@ 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isHeightValid &&
    isWeightValid &&
    isEmailAuthed &&
    checkNum === '이메일 인증 완료';

  ///@ 임시번호 확인후 상태값 변경
  const checkTempNumValid = () => {
    if (isEmailAuthed) {
      alert('You have successfully authenticated your email.');
      setCheckNum('이메일 인증 완료');
    } else {
      alert('The authentication number was entered incorrectly.');
      setCheckNum('');
    }
  };

  ///@ 버튼 그룹
  const buttons = [
    <GenderBtn
      key="male"
      color="success"
      variant={gender === 'male' ? 'contained' : 'outlined'}
      onClick={() => setGender('male')}
    >
      male
    </GenderBtn>,
    <GenderBtn
      key="female"
      color="success"
      variant={gender === 'female' ? 'contained' : 'outlined'}
      onClick={() => setGender('female')}
    >
      female
    </GenderBtn>,
  ];

  ///@ 회원가입 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(
      //   `%c이메일: ${email}, 비번: ${password}, 닉넴: ${name}, 성별: ${gender}, 키: ${height}, 몸무게: ${weight} 아이콘 ${icon}`,
      //   'color: #94D82D;',
      // );
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
      {/* ///@ 동그라미들 */}
      <RegisterCircleRed1></RegisterCircleRed1>
      <RegisterCircleRed2></RegisterCircleRed2>
      <RegisterCircleGreen1></RegisterCircleGreen1>
      <RegisterCircleGreen2></RegisterCircleGreen2>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
          marginTop: 313,
          marginBottom: 313,
        }}
      >
        <RegisterGlass>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column',
            }}
          >
            {/* ///@ 회원가입 타이틀 */}
            <RegisterTitle>Register</RegisterTitle>
            <Box
              sx={{
                '& > :not(style)': { m: 1, width: '560px' },
              }}
              autoComplete="off"
            >
              {/* ///@ 이메일 */}
              <ValidationTextField
                style={{ width: 437 }}
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
              {/* ///@ 이메일 인증 버튼 */}
              <ColorButton
                style={{ width: 100, fontSize: 14 }}
                disabled={!isEmailValid}
                onClick={reqCode}
                title="Click the button to receive the verification code by email."
              >
                Email Auth
              </ColorButton>
              <br></br>
              {/* ///@ 인증번호 확인 input */}
              <ValidationTextField
                style={{ width: 437 }}
                error={!checkNum}
                size="small"
                helperText={
                  !isEmailAuthed && <RedSpan> The authentication number is invalid. </RedSpan>
                }
                placeholder="Please enter the authentication number after receiving the email verification."
                onChange={(e) => {
                  setCode(e.target.value);
                  setCheckNum(true);
                }}
              />
              {/* ///@ 인증번호 확인 버튼 */}
              <SmallButton
                style={{ width: 100 }}
                size="small"
                disabled={!code || code === '유저가 임시번호를 치면 받아오는 곳이랍니다.'}
                onClick={checkTempNumValid}
              >
                Check
              </SmallButton>
              <br></br>
              {/* ///@ 비밀번호 */}
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
              {/* ///@ 비밀번호 확인 */}
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
              {/* ///@ 닉네임 */}
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
              {/* ///@ 성별 */}
              <ButtonGroup>{buttons}</ButtonGroup>
              {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
                <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
              </RadioGroup> */}
              <br></br>
              {/* ///@ 키 */}
              <ValidationTextField
                required
                // {!checkLogin && error}
                // error={!checkLogin}
                label="Height"
                // autoComplete="email"
                helperText={
                  !isHeightValid && (
                    <RedSpan>Please enter a number only.(The unit is feet.)</RedSpan>
                  )
                }
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  // setCheckLogin(true);
                }}
                // defaultValue="Hello World"
              />
              <br></br>
              {/* ///@ 체중 */}
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
                '& > :not(style)': { m: 1, width: '560px' },
              }}
              noValidate
              autoComplete="off"
            >
              {/* ///@ 뱃지 */}
              <FormLabel id="demo-row-radio-buttons-group-label">Badges</FormLabel>
              <RadioGroup
                row
                title="You can choose one of these badges."
                name="row-radio-buttons-group"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <FormControlLabel
                  title="일반인"
                  value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_1.png"
                  labelPlacement="bottom"
                  control={<Radio color="success" />}
                  label={<img src="/first_badge_1.png" alt="all" style={{ width: 100 }}></img>}
                />
                <FormControlLabel
                  title="인싸"
                  value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_2.png"
                  labelPlacement="bottom"
                  control={<Radio color="success" />}
                  label={<img src="/first_badge_2.png" alt="all" style={{ width: 100 }}></img>}
                />
                <FormControlLabel
                  title="핵인싸"
                  value="https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_3.png"
                  labelPlacement="bottom"
                  control={<Radio color="success" />}
                  label={<img src="/first_badge_3.png" alt="all" style={{ width: 100 }}></img>}
                />
                <FormControlLabel
                  title="찐"
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
                style={{ marginTop: 40 }}
              >
                {/* ///@ 버튼들 */}
                <ColorButton
                  variant="contained"
                  style={{ width: '35%' }}
                  type="submit"
                  disabled={!isFormValid}
                >
                  Sign-up
                </ColorButton>
                <ColorButtonB
                  variant="outlined"
                  style={{ width: '35%' }}
                  onClick={() => navigate('/login')}
                >
                  Back
                </ColorButtonB>
              </Stack>
            </Box>
          </form>
        </RegisterGlass>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default RegisterForm;
