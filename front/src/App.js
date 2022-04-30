import React, { useState, useEffect, useReducer, createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LoginForm from './components/user/LoginForm';
import Home from './components/start/Home';

import RegisterForm from './components/user/RegisterForm';
import Portfolio from './components/Portfolio';
import MainFoodAdd from './components/main/MainFoodAdd';
import MainExerciseAdd from './components/main/MainExerciseAdd';
import Network from './components/network/Network';

import Mypage from './components/mypage/Mypage'; // mypage 작업용

import UserEditForm from './components/user/UserEditForm';
import UserDelForm from './components/user/UserDelForm';
import ChangePwForm from './components/user/ChangePwForm';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/tracking/:user_id" element={<Portfolio />} />
      <Route path="/tracking/addFood" element={<MainFoodAdd />} />
      <Route path="/tracking/addExercise" element={<MainExerciseAdd />} />
      <Route path="/network" element={<Network />} />
      <Route path="/:user_id" element={<Mypage />} />
      <Route path="/users" element={<UserEditForm />} />
      <Route path="/users/delete" element={<UserDelForm />} />
      <Route path="/mypage" element={<Mypage />} />
      {/* <Route path="/password/init" element={<FindPwForm />} /> */}
      <Route path="/password" element={<ChangePwForm />} />
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}

export default App;
