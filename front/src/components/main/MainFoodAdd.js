import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton';

import Header from '../Header';
import Footer from '../Footer';

import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { foodListState } from '../../atoms';

import { userInfoState } from '../../atoms';

import * as Api from '../../api';

function MainFoodAdd({}) {
  const navigate = useNavigate();

  const user = useRecoilValue(userInfoState);
  const foodList = useRecoilValue(foodListState);

  const [checked, setChecked] = useState(true);

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [kcal, setKcal] = useState();
  const [unit, setUnit] = useState('gram');

  useEffect(() => {
    const allFoodCategory = foodList.map((food) => food.category);
    const set = new Set(allFoodCategory);

    setCategoryList([...set]);
  }, []);

  useEffect(() => {
    if (checked === true) {
      setUnit('100g');
    } else {
      setUnit('1lb');
    }
  }, [checked]);

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async () => {
    try {
      await Api.post(`foods`, {
        category: category,
        name: name,
        kcal: kcal,
        unit: unit,
      });

      alert('Food has been added');
      navigate(`/tracking/${user._id}`, { replace: false });
    } catch (err) {
      alert('Food that already exists');
    }
  };

  return (
    <>
      <Header />
      <div style={{ margin: '100px 80px' }}>
        <h1>Add Food</h1>
        <div style={{ display: 'flex' }}>
          <div>
            <h2>Please Select a Category</h2>
            <Autocomplete
              value={category}
              onChange={(event, newValue) => {
                setCategory(newValue);
              }}
              id="controllable-states-demo"
              options={categoryList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="category" />}
            />
            <h2>Please Enter a Name</h2>
            <TextField
              id="outlined-basic"
              label="food name"
              variant="outlined"
              inputValue={name}
              onBlur={(e) => setName(e.target.value)}
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

export default MainFoodAdd;
