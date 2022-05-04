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
import { ValidationTextField, ColorButton } from '../styledCompo/uesrStyle';

//Compo
import Header from '../Header';
import Footer from '../Footer';

function GithubLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [icon, setIcon] = useState('runner');

  useEffect(() => {
    const login = async () => {
      try {
        const code = new URLSearchParams(location.search);
        const data = await Api.get(`users/login/github?${code}`).then((res) => res.data);
        setEmail(data.email);
        setName(data.name);
      } catch (error) {
        console.log(`❌ Error: ${error}`);
      }
    };
    login();
  }, [location, navigate]);

  const isHeightValid = Number(height) > 0 && height.length > 0;
  const isWeightValid = Number(weight) > 0 && weight.length > 0;
  const isFormValid = isHeightValid && isWeightValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = Api.post('users/register/social', {
        email,
        name,
        gender,
        height: Number(height),
        weight: Number(weight),
        icon,
      });
      console.log('1', user);
      const jwtToken = user.token;
      sessionStorage.setItem('userToken', jwtToken);
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
              <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
            </RadioGroup>
            <ValidationTextField
              required
              label="Height"
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
      </Container>
      <Footer></Footer>
    </>
  );
}

export default GithubLogin;
