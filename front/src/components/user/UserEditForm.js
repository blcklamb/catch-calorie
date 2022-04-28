import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState, userState } from '../../atoms';
import { Navigate, useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';

// Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//styled Compo
import { ValidationTextField, ColorButton, ColorButtonB } from '../styledCompo/uesrStyle';

//Compo
import Header from '../Header';
import Footer from '../Footer';

const UserEditForm = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [editUser, setEditUser] = useState(userInfo);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = editUser.name.length >= 2;
  // 공백이나 숫자인지 여부를 확인함.
  const isHeightValid = String(editUser.height).length > 0 && Number(editUser.height) > 0;
  // 공백이나 숫자인지 여부를 확인함.
  const isWeightValid = String(editUser.weight).length > 0 && Number(editUser.weight) > 0;

  // 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isNameValid && isHeightValid && isWeightValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('원래 uesr 정보', userInfo);
      console.log('put 요청 보내기 전 수정한 user 정보', editUser);
      const res = await Api.put(`users/${userInfo._id}`, {
        email: editUser.email,
        password: editUser.password,
        name: editUser.name,
        gender: editUser.gender,
        height: Number(editUser.height),
        weight: Number(editUser.weight),
        icon: editUser.icon,
        status: editUser.status,
      });

      console.log('회원 정보 수정 후 PUT 응답으로 수정된 회원 정보를 가져옵니다.', res.data);
      setUserInfo(res.data);
      navigate('/tracking');
      console.log('req 요청 갔고 응답 받았습니다..');
    } catch (err) {
      console.log(`req 요청이 제대로 가지 않았군요 ${err}`);
    }
  };

  return (
    <div>
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
          <h1 style={{ margin: 10 }}>Edit</h1>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '600px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column',
            }}
            noValidate
            autoComplete="off"
          >
            <br></br>
            <ValidationTextField
              required
              // {!checkLogin && error}
              error={!isNameValid}
              label="Nick Name"
              helperText={
                !isNameValid && <span>Please set the nickname at least 2 characters.</span>
              }
              value={editUser.name}
              onChange={(e) => {
                setEditUser((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <br></br>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={editUser.gender}
              onChange={(e) => setEditUser((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
              <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
            </RadioGroup>
            <ValidationTextField
              required
              // {!checkLogin && error}
              error={!isHeightValid}
              label="Height"
              helperText={
                !isHeightValid && <span>Please enter a number only.(The unit is feet.)</span>
              }
              value={editUser.height}
              onChange={(e) => {
                setEditUser((prev) => ({ ...prev, height: e.target.value }));
              }}
            />
            <br></br>
            <ValidationTextField
              required
              error={!isWeightValid}
              label="Weight"
              helperText={
                !isWeightValid && <span>Please enter a number only.(The unit is pounds.)</span>
              }
              value={editUser.weight}
              onChange={(e) => {
                setEditUser((prev) => ({ ...prev, weight: e.target.value }));
              }}
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
              value={editUser.icon}
              onChange={(e) => setEditUser((prev) => ({ ...prev, icon: e.target.value }))}
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
          </Box>
          <br></br>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '600px' },
            }}
            noValidate
            autoComplete="off"
          >
            <ValidationTextField
              label="Status"
              value={editUser.status}
              onChange={(e) => {
                setEditUser((prev) => ({ ...prev, status: e.target.value }));
              }}
            />
          </Box>
          <br></br>
          <br></br>

          <Stack
            spacing={1}
            direction="row"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <ColorButton variant="contained" type="submit" disabled={!isFormValid}>
              Submit
            </ColorButton>
            <ColorButtonB variant="outlined" onClick={() => navigate('/tracking')}>
              back
            </ColorButtonB>
          </Stack>
        </form>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default UserEditForm;
