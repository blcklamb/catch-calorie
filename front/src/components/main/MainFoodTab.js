import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import MainButton from './style/MainButton';
import MainInput from './style/MainInput';

import MainFoodForm from './MainFoodForm';

import * as Api from '../../api';

function MainFoodTab({ foodSelected, setFoodSelected, totalFood, setTotalFood }) {
  const [value, setValue] = React.useState();
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [foodApiList, setFoodApiList] = useState('');
  const [foodFormList, setFoodFormList] = useState([0]);

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodApiList(res.data));
  }, []);

  const onAddFoodForm = () => {
    let countArr = [...foodFormList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setFoodFormList(countArr);
  };

  const handleOnClickCheck = () => {
    setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal_per100g, totalFood));
    setFoodSelected([]);

    console.log(foodSelected[0]?._id);
    // Api.post(`tracking/food/${foodSelected[0]?._id}`) // .then((res) => setFoodApiList(res.data));
    Api.post(`tracking/food`, foodSelected[0]?._id); // .then((res) => setFoodApiList(res.data));
  };

  return (
    <div>
      {foodFormList &&
        foodFormList.map((item, i) => (
          <MainFoodForm
            key={i}
            foodSelected={foodSelected}
            setFoodSelected={setFoodSelected}
            totalFood={totalFood}
            setTotalFood={setTotalFood}
            foodFormList={foodFormList}
          />
        ))}
      <MainButton variant="contained" onClick={onAddFoodForm}>
        +
      </MainButton>
      <MainButton variant="contained" onClick={handleOnClickCheck}>
        check
      </MainButton>
    </div>
  );
}

export default MainFoodTab;
