import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Api from '../../api';

// Mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

//styled Compo
import { ValidationTextField, ColorButton, ColorButtonB } from '../styledCompo/muiCustom';

//Compo
import Header from '../Header';
import Footer from '../Footer';

//import recoil
import { useSetRecoilState } from 'recoil';
import { tokenState, userState } from '../../atoms';
import {
  GenderBtn,
  RegisterCircleGreen1,
  RegisterCircleGreen2,
  RegisterCircleRed1,
  RegisterCircleRed2,
  RegisterGlass,
  RegisterTitle,
} from '../styledCompo/RegisterStyle';
import { RedSpan } from '../styledCompo/LoginStyle';
import { Button, ButtonGroup } from '@mui/material';
import { Stack } from '@mui/material';

function GithubLogin() {
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const location = useLocation();
  const navigate = useNavigate();

  const [isDone, setIsDone] = useState(false);
  const [data, setData] = useState({});
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [icon, setIcon] = useState(
    'https://bucket-5ialfb.s3.ap-northeast-2.amazonaws.com/icon/first_badge_1.png',
  );
  const [unit, setUnit] = useState('us');

  ///@ 버튼 그룹 gender
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
  ///@ 버튼 그룹 unit
  const unitButtons = [
    <Button
      key="cm/kg"
      color="success"
      variant={unit === 'non_us' ? 'contained' : 'outlined'}
      onClick={() => setUnit('non_us')}
    >
      Metric
    </Button>,
    <Button
      key="ft/lb"
      color="success"
      variant={unit === 'us' ? 'contained' : 'outlined'}
      onClick={() => setUnit('us')}
    >
      U.S.Standard
    </Button>,
  ];

  ///@ height, weight 조건부 헬퍼텍스트 렌더링
  const unitChangeHeight = () => {
    if (unit === 'us') {
      return <RedSpan>Please enter a number only.(The unit is feet.)</RedSpan>;
    }
    return <RedSpan>Please enter a number only.(The unit is cm.)</RedSpan>;
  };

  const unitChangeWeight = () => {
    if (unit === 'us') {
      return <RedSpan>Please enter a number only.(The unit is lb.)</RedSpan>;
    }
    return <RedSpan>Please enter a number only.(The unit is kg.)</RedSpan>;
  };

  useEffect(() => {
    const auth = async () => {
      try {
        const code = new URLSearchParams(location.search);

        const data = await Api.get(`users/login/github?${code}`).then((res) => res.data);
        const { token, _id } = data;

        if (token) {
          const user = await Api.get(`users/${_id}`).then((res) => res.data);

          sessionStorage.setItem('userToken', token);
          setToken(token);
          setUser(user);

          return navigate(`/tracking/${user._id}`, { replace: true });
        }

        setData(data);
        setIsDone(true);
      } catch (error) {
        console.log(`❌ ${error}`);
      }
    };
    auth();
  }, [location, navigate, setToken, setUser]);

  const isHeightValid = height > 0;
  const isWeightValid = weight > 0;
  const isFormValid = isHeightValid && isWeightValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Api.post('users/register/social', {
        email: data.email,
        name: data.name,
        gender,
        height: Number(height),
        weight: Number(weight),
        unit,
        icon,
      }).then((res) => res.data);

      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem('userToken', user.token);
      setToken(user.token);
      setUser(user);

      navigate(`/tracking/${user._id}`, { replace: true });
    } catch (err) {
      console.log(`❌ Register Error: ${err}`);
    }
  };

  return (
    <>
      <Header></Header>
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
        {isDone || (
          <RegisterGlass style={{ height: '1300px' }}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'column',
              }}
            >
              <RegisterTitle style={{ paddingTop: 100, paddingBottom: 0 }}>GitHub</RegisterTitle>
              <RegisterTitle style={{ paddingTop: 0 }}>Register</RegisterTitle>
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '560px', display: 'flex' },
                }}
                autoComplete="off"
              >
                {/* ///@ 성별 */}
                <ButtonGroup>{buttons}</ButtonGroup>
                <br></br>

                {/* ///@ 유닛 */}
                <ButtonGroup size="small" style={{ justifyContent: 'flex-end' }}>
                  <div>{unitButtons}</div>
                </ButtonGroup>

                <br />
                {/* ///@ 키 */}
                <ValidationTextField
                  required
                  // {!checkLogin && error}
                  // error={!checkLogin}
                  type="number"
                  label="Height"
                  // autoComplete="email"
                  helperText={!isHeightValid && unitChangeHeight()}
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
                  type="number"
                  label="Weight"
                  // autoComplete="email"
                  helperText={!isWeightValid && unitChangeWeight()}
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
        )}
      </Container>
    </>
  );
}

export default GithubLogin;
