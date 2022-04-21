import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

// Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import * as Api from '../../api';
import { DispatchContext } from '../../App';

function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useContext(DispatchContext);

	//useState로 email 상태를 생성함.
	const [email, setEmail] = useState('');
	//useState로 password 상태를 생성함.
	const [password, setPassword] = useState('');
	// input 상태관리
	const [checkLogin, setCheckLogin] = useState(true);

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
	//
	// 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
	const isFormValid = isEmailValid && isPasswordValid;

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// "user/login" 엔드포인트로 post요청함.
			const res = await Api.post('user/login', {
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
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: user,
			});

			// 기본 페이지로 이동함.
			navigate('/Portfolio', { replace: true });
		} catch (err) {
			console.log('로그인에 실패하였습니다.\n', err);
			setCheckLogin(false);
		}
	};

	return (
		<div>
			<form action="/" onSubmit={handleSubmit}>
				<Box
					sx={{
						'& > :not(style)': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						autoFocus
						required
						// {!checkLogin && error}
						error={!checkLogin}
						id="outlined-required"
						label="Email Address"
						autoComplete="email"
						helperText={
							(!isEmailValid && <span>이메일 형식이 올바르지 않습니다.</span>) ||
							(!checkLogin && <span>잘못된 이메일입니다.</span>)
						}
						value={email}
						onChange={e => {
							setEmail(e.target.value);
							setCheckLogin(true);
						}}
						// defaultValue="Hello World"
					/>

					<TextField
						required
						error={!checkLogin}
						id="outlined-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={password}
						helperText={
							(!isPasswordValid && <span> 비밀번호는 4글자 이상입니다. </span>) ||
							(!checkLogin && <span>잘못된 비밀번호입니다.</span>)
						}
						onChange={e => {
							setPassword(e.target.value);
							setCheckLogin(true);
						}}
					/>
					<Stack spacing={2} direction="row">
						<Button variant="contained" type="submit" disabled={!isFormValid}>
							로그인
						</Button>
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

export default LoginForm;
