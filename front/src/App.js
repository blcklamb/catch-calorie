import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './components/main/Main';

function App() {
	return (
		<Router>
			<Routes>
				{/* 추후 경로 수정 요망 */}
				<Route path="/" exact element={<Main />} />
			</Routes>
		</Router>
	);
}

export default App;
