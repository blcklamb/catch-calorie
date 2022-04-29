import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserStateContext, DispatchContext } from '../../App';
import * as Api from '../../api';

function TempStart() {
	const navigate = useNavigate();

	return (
		<>
			<h1>시작 페이지</h1>
			<div>🚀 임시적인 시작 페이지 임니당 🚀</div>
			<p></p>
			<button onClick={() => navigate('/login', { replace: true })}>시작하기</button>
		</>
	);
}

export default TempStart;
