import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	//이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
	const validateEmail = email => {
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
	// 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
	const isPasswordSame = password === confirmPassword;
	// 이름이 2글자 이상인지 여부를 확인함.
	const isNameValid = name.length >= 2;

	// 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
	const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// console.log(email, password, name);
			// "user/register" 엔드포인트로 post요청함.
			await Api.post('user/register', {
				email,
				password,
				name,
			});

			// 로그인 페이지로 이동함.
			navigate('/login');
		} catch (err) {
			console.log('회원가입에 실패하였습니다.', err);
		}
	};

	return (
		<>
			<Container
				style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
			>
				<FormControl action="/" onSubmit={handleSubmit}>
					<Box
						sx={{
							'& > :not(style)': { m: 1, width: '28ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							autoFocus
							required
							// {!checkLogin && error}
							// error={!checkLogin}
							id="outlined-required"
							label="Email Address"
							autoComplete="email"
							// helperText={
							// 	(!isEmailValid && <span>이메일 형식이 올바르지 않습니다.</span>) ||
							// 	(!checkLogin && <span>잘못된 이메일입니다.</span>)
							// }
							value={email}
							onChange={e => {
								setEmail(e.target.value);
								// setCheckLogin(true);
							}}
							// defaultValue="Hello World"
						/>
						{!isEmailValid && <p>이메일 형식이 올바르지 않습니다.</p>}
						<br></br>
						<TextField
							required
							// error={!checkLogin}
							id="outlined-password-input"
							label="Password"
							type="password"
							autoComplete="current-password"
							value={password}
							// helperText={
							// 	(!isPasswordValid && <span> 비밀번호는 4글자 이상입니다. </span>) ||
							// 	(!checkLogin && <span>잘못된 비밀번호입니다.</span>)
							// }
							onChange={e => {
								setPassword(e.target.value);
								// setCheckLogin(true);
							}}
						/>
						{!isPasswordValid && <p>비밀번호는 4글자 이상으로 설정해 주세요.</p>}
						<br></br>
						<TextField
							required
							// error={!checkLogin}
							label="Confirm Password"
							type="password"
							autoComplete="current-password"
							value={confirmPassword}
							// helperText={
							// 	(!isPasswordValid && <span> 비밀번호는 4글자 이상입니다. </span>) ||
							// 	(!checkLogin && <span>잘못된 비밀번호입니다.</span>)
							// }
							onChange={e => {
								setConfirmPassword(e.target.value);
								// setCheckLogin(true);
							}}
						/>
						{!isPasswordSame && <p>비밀번호가 일치하지 않습니다.</p>}
						<br></br>
						<TextField
							required
							// {!checkLogin && error}
							// error={!checkLogin}
							label="Nick Name"
							// autoComplete="email"
							// helperText={
							// 	(!isEmailValid && <span>이메일 형식이 올바르지 않습니다.</span>) ||
							// 	(!checkLogin && <span>잘못된 이메일입니다.</span>)
							// }
							value={name}
							onChange={e => {
								setName(e.target.value);
								// setCheckLogin(true);
							}}
							// defaultValue="Hello World"
						/>
						{!isNameValid && <p>별명은 2글자 이상으로 설정해 주세요.</p>}
						<br></br>
						<FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={gender}
							onChange={e => setGender(e.target.value)}
						>
							<FormControlLabel value="male" control={<Radio />} label="Male" />
							<FormControlLabel value="female" control={<Radio />} label="Female" />
						</RadioGroup>
						<TextField
							required
							// {!checkLogin && error}
							// error={!checkLogin}
							label="Height"
							// autoComplete="email"
							// helperText={
							// 	(!isEmailValid && <span>이메일 형식이 올바르지 않습니다.</span>) ||
							// 	(!checkLogin && <span>잘못된 이메일입니다.</span>)
							// }
							value={height}
							onChange={e => {
								setHeight(e.target.value);
								// setCheckLogin(true);
							}}
							// defaultValue="Hello World"
						/>
						<br></br>
						<TextField
							required
							// {!checkLogin && error}
							// error={!checkLogin}
							label="Weight"
							// autoComplete="email"
							// helperText={
							// 	(!isEmailValid && <span>이메일 형식이 올바르지 않습니다.</span>) ||
							// 	(!checkLogin && <span>잘못된 이메일입니다.</span>)
							// }
							value={weight}
							onChange={e => {
								setWeight(e.target.value);
								// setCheckLogin(true);
							}}
							// defaultValue="Hello World"
						/>
						<br></br>
						<FormLabel id="demo-row-radio-buttons-group-label">Icon</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={icon}
							onChange={e => setIcon(e.target.value)}
						>
							<FormControlLabel value="runner" control={<Radio />} label="runner" />
							<FormControlLabel value="walker" control={<Radio />} label="walker" />
							<FormControlLabel value="gymFreak" control={<Radio />} label="gymFreak" />
							<FormControlLabel value="beginner" control={<Radio />} label="beginner" />
						</RadioGroup>
						<Stack spacing={1} direction="row">
							<Button variant="contained" type="submit" disabled={!isFormValid}>
								가입하기
							</Button>
							<Button variant="contained" onClick={() => navigate('/login')}>
								로그인
							</Button>
							<Button variant="outlined" onClick={() => navigate('/')}>
								시작페이지
							</Button>
						</Stack>
					</Box>
				</FormControl>
			</Container>

			{/* <div>
				<form onSubmit={handleSubmit}>
					<div>
						<label>이메일 주소</label>
						<input
							type="email"
							autoComplete="off"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					{!isEmailValid && <p>이메일 형식이 올바르지 않습니다.</p>}

					<div>
						<label>비밀번호</label>
						<input
							type="password"
							autoComplete="off"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						{!isPasswordValid && <p>비밀번호는 4글자 이상으로 설정해 주세요.</p>}
					</div>

					<div>
						<label>비밀번호 재확인</label>
						<input
							ype="password"
							autoComplete="off"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</div>
					{!isPasswordSame && <p>비밀번호가 일치하지 않습니다.</p>}

					<div>
						<label>이름</label>
						<input
							type="text"
							autoComplete="off"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					{!isNameValid && <p>이름은 2글자 이상으로 설정해 주세요.</p>}

					<button type="submit" disabled={!isFormValid}>
						회원가입
					</button>
					<button onClick={() => navigate('/login')}>로그인 하기</button>
				</form>
			</div> */}

			{/* <Container>
				<Row className="justify-content-md-center mt-5">
					<Col lg={8}>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="registerEmail">
								<Form.Label>이메일 주소</Form.Label>
								<Form.Control
									type="email"
									autoComplete="off"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								{!isEmailValid && (
									<Form.Text className="text-success">이메일 형식이 올바르지 않습니다.</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="registerPassword" className="mt-3">
								<Form.Label>비밀번호</Form.Label>
								<Form.Control
									type="password"
									autoComplete="off"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
								{!isPasswordValid && (
									<Form.Text className="text-success">
										비밀번호는 4글자 이상으로 설정해 주세요.
									</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="registerConfirmPassword" className="mt-3">
								<Form.Label>비밀번호 재확인</Form.Label>
								<Form.Control
									type="password"
									autoComplete="off"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
								{!isPasswordSame && (
									<Form.Text className="text-success">비밀번호가 일치하지 않습니다.</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="registerName" className="mt-3">
								<Form.Label>이름</Form.Label>
								<Form.Control
									type="text"
									autoComplete="off"
									value={name}
									onChange={e => setName(e.target.value)}
								/>
								{!isNameValid && (
									<Form.Text className="text-success">
										이름은 2글자 이상으로 설정해 주세요.
									</Form.Text>
								)}
							</Form.Group>

							<Form.Group as={Row} className="mt-3 text-center">
								<Col sm={{ span: 20 }}>
									<Button variant="primary" type="submit" disabled={!isFormValid}>
										회원가입
									</Button>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mt-3 text-center">
								<Col sm={{ span: 20 }}>
									<Button variant="light" onClick={() => navigate('/login')}>
										로그인하기
									</Button>
								</Col>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container> */}
		</>
	);
}

export default RegisterForm;
