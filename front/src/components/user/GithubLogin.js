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
import { ValidationTextField, ColorButton } from '../styledCompo/muiCustom';

//Compo
import Header from '../Header';
import Footer from '../Footer';

//import recoil
import { useSetRecoilState } from 'recoil';
import { tokenState, userState } from '../../atoms';

function GithubLogin() {
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const location = useLocation();
  const navigate = useNavigate();

  const [isDone, setIsDone] = useState(false);
  const [data, setData] = useState({});
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [icon, setIcon] = useState('runner');

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
        height,
        weight,
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
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
          marginTop: 50,
        }}
      >
        {isDone && (
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
              <br />
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
                <FormControlLabel
                  value="female"
                  control={<Radio color="success" />}
                  label="Female"
                />
              </RadioGroup>
              <ValidationTextField
                required
                label="Height"
                type="number"
                helperText={
                  !isHeightValid && <span>Please enter a number only.(The unit is feet.)</span>
                }
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
              <br />
              <ValidationTextField
                required
                label="Weight"
                type="number"
                helperText={
                  !isWeightValid && <span>Please enter a number only.(The unit is pounds.)</span>
                }
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
              <br />
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
              <ColorButton variant="contained" type="submit" disabled={!isFormValid}>
                Login
              </ColorButton>
            </Box>
          </form>
        )}
      </Container>
      <Footer></Footer>
    </>
  );
}

export default GithubLogin;
