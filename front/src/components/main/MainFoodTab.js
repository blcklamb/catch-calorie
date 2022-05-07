import React, { useState, useEffect } from 'react';

import MainButton from './style/MainButton';
import MainFoodForm from './MainFoodForm';

import {
  TrackingForms,
  TrackingButtonContainer,
  TrackingLeftButtonContainer,
  TrackingRightButtonContainer,
  TrackingPlusButtonContainer,
} from '../styledCompo/mainStyle';
import {
  TrackingPlusButton,
  TrackingResetButton,
  TrackingTrackingButton,
} from '../styledCompo/MainMuiCustom';

import { useRecoilState } from 'recoil';
import {
  foodSelectedState,
  weightState,
  kcalPerUnitState,
  trackingUpdateState,
  foodFormsState,
  trackingFoodUnitState,
} from '../../atoms';

import * as Api from '../../api';

function MainFoodTab({ clearForm }) {
  const [foodSelected, setFoodSelected] = useRecoilState(foodSelectedState);
  const [weight, setWeight] = useRecoilState(weightState);
  const [kcalPerUnit, setKcalPerUnit] = useRecoilState(kcalPerUnitState);
  const [unit, setUnit] = useRecoilState(trackingFoodUnitState);
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [foodForms, setFoodForms] = useRecoilState(foodFormsState);

  const [isFoodEmpty, setIsFoodEmpty] = useState(false);
  const [isWeightEmpty, setIsWeightEmpty] = useState(false);

  const [isWeightNumber, setIsWeightNumber] = useState([true]);

  const handleAddFoodForm = () => {
    let countArr = [...foodForms];
    let counter = countArr.slice(-1)[0];

    counter += 1;
    countArr.push(counter);

    setFoodForms(countArr);

    // + 클릭 시 추가된 폼의 각 인풋 default를 빈칸 혹은 각 default 값으로
    setFoodSelected([...foodSelected, 0]);
    setWeight([...weight, '']);
    setUnit([...unit, 'us']);

    setTimeout(() => {
      const boxid = document.querySelector('#tracking-food-forms');
      boxid.scrollTop = boxid.scrollHeight;
    }, 1);
  };

  const handleTracking = async () => {
    foodSelected.map(async (food, i) => {
      const numWeight = weight.map((weight) => {
        return Number(weight);
      });

      // setIsFoodEmpty(foodSelected.includes(0));
      // setIsWeightEmpty(weight.includes(''));
      // setIsWeightNumber(!numWeight.includes(NaN)); // 숫자만 있거나 빈 값이면 true, 아니면 false

      try {
        if (!foodSelected.includes(0) && !weight.includes('') && !numWeight.includes(NaN)) {
          await Api.post(`tracking/food`, {
            name: food.name,
            weight: Number(weight[i]),
            unit: unit[i],
          });

          await Api.post(`foods/${food._id}`);

          // 폼 및 그래프 레이블 초기화 위함
          setFoodForms([0]);
          setFoodSelected([0]);
          setWeight(['']);
          setUnit(['us']);
          setKcalPerUnit([0]);

          setTrackingUpdate(!trackingUpdate);
          clearForm();
        }
      } catch (err) {
        console.log('전송 실패', err);
      }
    });
  };

  const handleResetForm = () => {
    setFoodForms([0]);
    setFoodSelected([0]);
    setWeight(['']);
    setUnit(['us']);
    setKcalPerUnit([0]);

    setTrackingUpdate(!trackingUpdate);
    // clearForm();
  };

  return (
    <>
      <TrackingForms id="tracking-food-forms">
        {foodForms && foodForms.map((item) => <MainFoodForm key={item} idx={item} />)}
      </TrackingForms>
      <TrackingButtonContainer>
        <TrackingLeftButtonContainer>
          <TrackingResetButton variant="contained" onClick={handleResetForm}>
            Reset
          </TrackingResetButton>
        </TrackingLeftButtonContainer>
        <TrackingRightButtonContainer>
            <TrackingPlusButton variant="contained" onClick={handleAddFoodForm}>
              +
            </TrackingPlusButton>
          <TrackingTrackingButton variant="contained" onClick={handleTracking}>
            Tracking
          </TrackingTrackingButton>
        </TrackingRightButtonContainer>
      </TrackingButtonContainer>
    </>
  );
}

export default MainFoodTab;
