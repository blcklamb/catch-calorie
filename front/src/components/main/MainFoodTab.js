import React, { useState } from 'react';

import MainButton from './style/MainButton';
import MainFoodForm from './MainFoodForm';

import { useRecoilState } from 'recoil';
import { foodSelectedState, gramState, kcalPerGramState, trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function MainFoodTab({ clearForm }) {
  const [foodSelected, setFoodSelected] = useRecoilState(foodSelectedState);
  const [gram, setGram] = useRecoilState(gramState);
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [foodForms, setFoodForms] = useState([0]);

  const handleAddFoodForm = () => {
    let countArr = [...foodForms];
    let counter = countArr.slice(-1)[0];

    counter += 1;
    countArr.push(counter);

    setFoodForms(countArr);
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

        setFoodSelected(foodSelected.map((f, i) => 0)); // 그래프 레이블 초기화 위함
        setTrackingUpdate(!trackingUpdate);
      } catch (err) {
        console.log('전송 실패', err);
      }
    });

    clearForm();
  };

  return (
    <div>
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
