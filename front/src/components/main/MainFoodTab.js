import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import MainButton from './style/MainButton';
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
  const [foodForms, setFoodForms] = useState([0]);
  const [gram, setGram] = useState([])

  const handleAddFoodForm = () => {
    let countArr = [...foodForms];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setFoodForms(countArr);
  };

  const handleTracking = () => {
    setTotalFood(kcalPerGram.reduce((acc, cur) => acc + cur, totalFood));
    setFoodSelected([]);
    setKcalPerGram([]);

    // console.log(foodSelected)
    // console.log(kcalPerGram)

    // // 백 구현이 되지 않았으므로 일단 중지
    // foodSelected.map((food, i) => {
    //   console.log(food.name)
    //   console.log(food.name)
    //   const name = food.name
    //   const gram = kcalPerGram[i] // gram -> kcal
      
    //   Api.post(`tracking/food`, {
    //     name, gram // gram -> kcal
    //   })
    // })

    // Api.post(`tracking/food`, foodSelected[0]?._id); // .then((res) => setFoodApiList(res.data));
  };

  return (
    <div>
      {foodForms &&
        foodForms.map((item, i) => (
          <MainFoodForm
            key={i}
            idx={i}
            foodSelected={foodSelected}
            setFoodSelected={setFoodSelected}
            gram={gram}
            setGram={setGram}
            kcalPerGram={kcalPerGram}
            setKcalPerGram={setKcalPerGram}
          />
        ))}
      <MainButton variant="contained" onClick={handleAddFoodForm}>
        +
      </MainButton>
      <MainButton variant="contained" onClick={handleTracking}>
        tracking
      </MainButton>
    </div>
  );
}

export default MainFoodTab;
