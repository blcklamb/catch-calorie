import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

  const handleSubmit = async () => {
    try {
      await Api.post(`exercises`, {
        name: name,
        kcal: kcal,
        unit: unit,
      });
      alert('Exercise has been added');
      navigate(`/tracking/${user._id}`, { replace: false });
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
            <h2>Please enter a name</h2>
            <TextField
              id="outlined-basic"
              label="exercise name"
              variant="outlined"
              inputValue={name}
              onBlur={(e) => setName(e.target.value)}
            />
            <h2>Please enter a kcal</h2>
            <TextField
              id="outlined-basic"
              label="kcal"
              variant="outlined"
              inputValue={kcal}
              onBlur={(e) => setKcal(e.target.value)}
            />
            <h2>Please select a unit</h2>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">unit</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <FormControlLabel value="kilogram" control={<Radio />} label="kilogram" />
                <FormControlLabel value="pound" control={<Radio />} label="pound" />
              </RadioGroup>
            </FormControl>
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
