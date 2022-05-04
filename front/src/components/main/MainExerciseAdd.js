import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

import MainButton from './style/MainButton';

import Header from '../Header';
import Footer from '../Footer';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import * as Api from '../../api';

function MainExerciseAdd({}) {
  const navigate = useNavigate();

  const user = useRecoilValue(userInfoState);

  const [name, setName] = useState();
  const [kcal, setKcal] = useState();
  const [unit, setUnit] = useState('kilogram');

  const [checked, setChecked] = useState(true);

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isKcalEmpty, setIsKcalEmpty] = useState(false);
  const [isKcalNumber, setIsKcalNumber] = useState(true);

  useEffect(() => {
    if (checked === true) {
      setUnit('kilogram');
    } else {
      setUnit('pound');
    }
  }, [checked]);

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async () => {
    setIsNameEmpty(!name);
    setIsKcalEmpty(!kcal);
    setIsKcalNumber(Number(kcal) > 0);

    try {
      if (name && kcal && isKcalNumber) {
        await Api.post(`exercises`, {
          name: name,
          kcal: kcal,
          unit: unit,
        }).then((res) => res.status === 201 && alert('Exercise has been added'));
        navigate(`/tracking/${user._id}`, { replace: false });
      }
    } catch (err) {
      alert('Exercise that already exists');
    }
  };

  return (
    <>
      <Header />
      <div style={{ margin: '100px 80px' }}>
        <h1>Add Exercise</h1>
        <div style={{ display: 'flex' }}>
          <div>
            <h2>Please Enter a Name</h2>
            <TextField
              id="outlined-basic"
              label="exercise name"
              variant="outlined"
              inputValue={name}
              onBlur={(e) => setName(e.target.value)}
              helperText={isNameEmpty && <span>Please enter a name</span>}
            />
            <h2>Please Enter a Kcal Per Unit Weight</h2>
            <Switch
              checked={checked}
              onChange={handleSwitch}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            {unit}
            <TextField
              id="outlined-basic"
              label="kcal"
              variant="outlined"
              inputValue={kcal}
              onBlur={(e) => setKcal(e.target.value)}
              helperText={
                isKcalEmpty ? (
                  <span>Please enter a kcal per unit weight</span>
                ) : (
                  !isKcalNumber && <span>Please enter a number only</span>
                )
              }
            />
          </div>
        </div>
        <MainButton variant="contained" onClick={handleSubmit}>
          Add
        </MainButton>
      </div>
      <Footer />
    </>
  );
}

export default MainExerciseAdd;
