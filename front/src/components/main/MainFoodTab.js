import React, { useState } from 'react';
import styled from 'styled-components';

import MainButton from './style/MainButton';
import MainFoodForm from './MainFoodForm';

import * as Api from '../../api';

function MainFoodTab({ foodSelected, setFoodSelected, kcalPerGram, setKcalPerGram, clearForm }) {
  const [foodForms, setFoodForms] = useState([0]);
  const [gram, setGram] = useState([]);

  const handleAddFoodForm = () => {
    let countArr = [...foodForms];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setFoodForms(countArr);
    setFoodSelected(foodForms.map((f, i) => 0));
  };

  // console.log(foodSelected);
  const handleTracking = () => {
    foodSelected.map((food, i) => {
      const g = Number(gram[i]);

      try {
        Api.post(`tracking/food`, {
          name: food.name,
          gram: g,
        });
      } catch (err) {
        console.log('전송 실패', err);
      }

      Api.post(`foods/${food._id}`);
    });

    // 그래프 레이블 초기화 위함
    setFoodSelected(foodSelected.map((f, i) => 0));
    // setGram(gram.map((g, i) => 0));
    // setKcalPerGram(kcalPerGram.map((g, i) => 0));

    clearForm();
  };

  return (
    <div>
      {/* {console.log(foodSelected)} */}
      {/* {console.log(gram)}
      {console.log(kcalPerGram)} */}
      {/* {console.log(foodForms)} */}
      {foodForms &&
        foodForms.map((item) => (
          <MainFoodForm
            key={item}
            idx={item}
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
