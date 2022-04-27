import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton';
import MainInput from './style/MainInput';

import MainFoodForm from './MainFoodForm';

import * as Api from '../../api';

function MainFoodTab({
  foodSelected,
  setFoodSelected,
  totalFood,
  setTotalFood,
  kcalPerGram,
  setKcalPerGram,
}) {
  const [foodApiList, setFoodApiList] = useState('');
  const [foodFormList, setFoodFormList] = useState([0]);

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));
  }, []);

  const handleAddFoodForm = () => {
    let countArr = [...foodFormList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setFoodFormList(countArr);
  };

  const handleCheck = () => {
    setTotalFood(kcalPerGram.reduce((acc, cur) => acc + cur, totalFood));
    setFoodSelected([]);
    setKcalPerGram([]);

    // Api.post(`tracking/food`, foodSelected[0]?._id); // .then((res) => setFoodApiList(res.data));
  };

  return (
    <div>
      {foodFormList &&
        foodFormList.map((item, i) => (
          <MainFoodForm
            key={i}
            idx={i}
            foodSelected={foodSelected}
            setFoodSelected={setFoodSelected}
            totalFood={totalFood}
            setTotalFood={setTotalFood}
            foodFormList={foodFormList}
            kcalPerGram={kcalPerGram}
            setKcalPerGram={setKcalPerGram}
          />
        ))}
      <MainButton variant="contained" onClick={handleAddFoodForm}>
        +
      </MainButton>
      <MainButton variant="contained" onClick={handleCheck}>
        check
      </MainButton>
    </div>
  );
}

export default MainFoodTab;
