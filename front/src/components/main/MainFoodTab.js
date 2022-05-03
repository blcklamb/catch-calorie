import React, { useState, useEffect } from 'react';

import MainButton from './style/MainButton';
import MainFoodForm from './MainFoodForm';

import { useRecoilState } from 'recoil';
import {
  foodSelectedState,
  gramState,
  kcalPerGramState,
  trackingUpdateState,
  foodFormsState,
} from '../../atoms';

import * as Api from '../../api';

function MainFoodTab({ clearForm }) {
  const [foodSelected, setFoodSelected] = useRecoilState(foodSelectedState);
  const [gram, setGram] = useRecoilState(gramState);
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [foodForms, setFoodForms] = useRecoilState(foodFormsState);

  const handleAddFoodForm = () => {
    let countArr = [...foodForms];
    let counter = countArr.slice(-1)[0];

    counter += 1;
    countArr.push(counter);

    setFoodForms(countArr);

    // + 클릭 시 추가된 폼의 각 인풋 default를 빈칸으로
    setFoodSelected([...foodSelected, 0]);
    setGram([...gram, '']);
  };

  const handleTracking = () => {
    foodSelected.map(async (food, i) => {
      const g = Number(gram[i]);

      try {
        await Api.post(`tracking/food`, {
          name: food.name,
          gram: g,
        });
        
        await Api.post(`foods/${food._id}`);
        
        
        // 폼 및 그래프 레이블 초기화 위함
        setFoodForms([0])
        setFoodSelected([0]);
        setGram([''])
        // setFoodSelected(foodSelected.map((f, i) => 0)); // (구버전)
        
        setTrackingUpdate(!trackingUpdate);
      } catch (err) {
        console.log('전송 실패', err);
      }
    });

    clearForm();
  };

  return (
    <div>
      {/* {console.log(foodForms)}
      {console.log(foodSelected)}
      {console.log(gram)} */}
      {foodForms && foodForms.map((item) => <MainFoodForm key={item} idx={item} />)}
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
