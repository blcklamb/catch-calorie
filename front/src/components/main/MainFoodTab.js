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
  const [value, setValue] = React.useState([]);
  // inputValue/ onInputChangeprops 조합 으로 "입력 값" 상태 . 이 상태는 텍스트 상자에 표시되는 값을 나타냅니다.
  const [inputValue, setInputValue] = React.useState([]);

  const [foodForms, setFoodForms] = useState([0]);
  const [gram, setGram] = useState([]);

  const handleAddFoodForm = () => {
    let countArr = [...foodForms];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setFoodForms(countArr);
  };

  console.log(foodSelected);
  const handleTracking = () => {
    foodSelected.map((food, i) => {
      // const name = food.name;
      const g = Number(gram[i]);
      
      try {
        Api.post(`tracking/food`, {
         name: food.name, 
         gram: g
       });

      } catch (err) {
        console.log('전송 실패', err)
      }

      Api.post(`foods/${food._id}`);
    });

    setTotalFood(kcalPerGram.reduce((acc, cur) => acc + cur, totalFood));
    // setFoodSelected([]);
    // setGram([]);
    // setKcalPerGram([]);
    setFoodSelected(foodSelected.map((f, i) => 0));
    setGram(gram.map((g, i) => 0));
    setKcalPerGram(kcalPerGram.map((g, i) => 0));

    // console.log(kcalPerGram)
  };

  // useEffect(() => {
  //   kcalPerGram.map((kcal, idx) => {
  //     if(isNaN(kcal)) {
  //       setKcalPerGram([...kcalPerGram.slice(0, idx), 0, ...kcalPerGram.slice(idx + 1)])
  //     }
  //   })
  // }, [gram])

  return (
    <div>
      {console.log(foodSelected)}
      {console.log(gram)}
      {console.log(kcalPerGram)}
      {/* {console.log(kcalPerGram)} */}
      {foodForms &&
        foodForms.map((item, i) => (
          <MainFoodForm
            key={i}
            idx={i}
            value={value}
            setValue={setValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
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
