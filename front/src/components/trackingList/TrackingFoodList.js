import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { ButtonGroup } from '@mui/material';

import {
  TrackingListTr,
  TrackingListTd,
  TrackingListTdAction,
  TrackingListTdStart,
  TrackingListTdEnd,
  TrackingListTdInput,
  TrackingListTdInputText,
  TrackingListIconContainer,
  TrackingListIcon,
} from '../styledCompo/mainStyle';

import { ValidationTextField } from '../styledCompo/muiCustom';

import { RedSpan } from '../styledCompo/LoginStyle';

import { useRecoilState } from 'recoil';
import { trackingUpdateState, trackingFoodUnitState } from '../../atoms';

import * as Api from '../../api';

function TrackingFoodList({ food, isTrackingPage }) {
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [isEditing, setIsEditing] = useState(false);

  const [weight, setWeight] = useState(food.gram);

  const [isWeightEmpty, setIsWeightEmpty] = useState(false);
  const [isWeightNumber, setIsWeightNumber] = useState(true);

  const [unit, setUnit] = useState('us');

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setWeight(food.gram);
  }, [food.gram]);

  useEffect(() => {
    if (checked === true) {
      setUnit('non us');
    } else {
      setUnit('us');
    }
  }, [checked]);

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const onChange = (e) => {
    setWeight(e.target.value);
  };

  const handleCheck = async (e) => {
    setIsWeightEmpty(!Number(weight));
    setIsWeightNumber(!isNaN(weight));

    try {
      if (Number(weight) && !isNaN(weight)) {
        await Api.put('tracking/food', {
          id: food.id,
          weight: Number(weight),
          unit: unit,
        });

        setIsEditing(false);
        setTrackingUpdate(!trackingUpdate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleModify = (e) => {
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    setWeight(food.gram);

    setIsWeightEmpty(false);
    setIsWeightNumber(true);

    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    await Api.delete(`tracking/food/${food.id}`);

    setTrackingUpdate(!trackingUpdate);
  };

  const previewKcal = () => {
    // gram에 숫자가 아닌 값이 입력되면 미리보기 칼로리 0
    if (!isNaN(weight)) {
      const gram = unit === 'us' ? weight * 453.59 : weight;

      return Math.round((Number(gram) * food.calorie) / food.gram);
    } else {
      return 0;
    }
  };

  const buttons = [
    <Button
      key="cm/kg"
      color="success"
      variant={checked ? 'contained' : 'outlined'}
      onClick={() => setChecked(true)}
    >
      Metric
    </Button>,
    <Button
      key="ft/lb"
      color="success"
      variant={!checked ? 'contained' : 'outlined'}
      onClick={() => setChecked(false)}
    >
      U.S.Standard
    </Button>,
  ];

  return (
    <>
      {isEditing ? (
        // 수정 모드
        <TrackingListTr>
          <TrackingListTdStart>{food.name}</TrackingListTdStart>
          <TrackingListTdInput>
            <tr>
              <ValidationTextField
                id="outlined-name"
                label="weight"
                value={weight}
                onChange={onChange}
                helperText={
                  !isWeightNumber ? (
                    <RedSpan>Please enter a number only</RedSpan>
                  ) : (
                    isWeightEmpty && <RedSpan>Please enter a weight</RedSpan>
                  )
                }
              />
            </tr>
            <tr>
              <ButtonGroup
                size="small"
                aria-label="small button group"
              >
                {buttons}
              </ButtonGroup>
            </tr>
          </TrackingListTdInput>
          <TrackingListTd>
            {previewKcal()}kcal/{unit === 'us' ? 'lb' : 'g'}
          </TrackingListTd>
          <TrackingListTdAction>
            <TrackingListIcon src="/done.png" alt="Done" onClick={handleCheck}></TrackingListIcon>
          </TrackingListTdAction>
          <TrackingListTdEnd>
            <TrackingListIcon
              src="/cancel.png"
              alt="Cancel"
              onClick={handleCancel}
            ></TrackingListIcon>
          </TrackingListTdEnd>
        </TrackingListTr>
      ) : (
        <TrackingListTr
          style={isTrackingPage !== 'tracking' ? { lineHeight: '20px' } : { lineHeight: '3.5rem' }}
        >
          {/* <TrackingListTr isTrackingPage={isTrackingPage}> */}
          <TrackingListTdStart>{food.name}</TrackingListTdStart>
          <TrackingListTd>{food.gram}g</TrackingListTd>
          <TrackingListTd>{food.calorie}kcal</TrackingListTd>
          {/* 트래킹 페이지에서만 버튼 O */}
          {isTrackingPage === 'tracking' && (
            <>
              <TrackingListTdAction>
                <TrackingListIcon
                  src="/edit.png"
                  alt="Edit"
                  onClick={handleModify}
                ></TrackingListIcon>
              </TrackingListTdAction>
              <TrackingListTdEnd>
                <TrackingListIcon
                  src="/del.png"
                  alt="Del"
                  onClick={handleDelete}
                ></TrackingListIcon>
              </TrackingListTdEnd>
            </>
          )}
        </TrackingListTr>
      )}
    </>
  );
}

export default TrackingFoodList;
