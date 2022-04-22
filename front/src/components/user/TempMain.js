import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserStateContext, DispatchContext } from '../../App';
import * as Api from '../../api';

function TempMain({ portfolioOwnerId, isEditable }) {
	// useState 훅을 통해 isEditing 상태를 생성함.
	const [isEditing, setIsEditing] = useState(false);
	// useState 훅을 통해 user 상태를 생성함.
	const [user, setUser] = useState(null);

	const navigate = useNavigate();
	// const location = useLocation();

	const userState = useContext(UserStateContext);
	const dispatch = useContext(DispatchContext);

	// 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
	// const isLogin = !!userState.user;

	// 로그아웃 클릭 시 실행되는 함수
	const logout = () => {
		// sessionStorage 에 저장했던 JWT 토큰을 삭제함.
		sessionStorage.removeItem('userToken');
		// dispatch 함수를 이용해 로그아웃함.
		dispatch({ type: 'LOGOUT' });
		// 기본 페이지로 돌아감.
		navigate('/');
	};

	useEffect(() => {
		// "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
		Api.get('user', portfolioOwnerId).then(res => setUser(res.data));
	}, [portfolioOwnerId]);

	return (
		<>
			<div>✨ 임시적인 메인 페이지 임니당 ✨</div>
			<p></p>
			<button onClick={logout}>로그아웃</button>
		</>
	);
}

export default TempMain;
