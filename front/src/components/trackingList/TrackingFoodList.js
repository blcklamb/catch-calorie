import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

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

  return (
    <>
      {isEditing ? (
        // 수정 모드
        <TrackingListTr>
          <TrackingListTdStart>{food.name}</TrackingListTdStart>
          <TrackingListTdInput>
            <tr>
              <td>
                <ValidationTextField
                  id="outlined-name"
                  label="weight"
                  value={weight}
                  onChange={onChange}
                  helperText={
                    !isWeightNumber ? (
                      <span>Please enter a number only</span>
                    ) : (
                      isWeightEmpty && <span>Please enter a weight</span>
                    )
                  }
                />
              </td>
              <td>
                <Switch
                  checked={checked}
                  onChange={handleSwitch}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </td>
            </tr>
            <TrackingListTdInputText style={{ float: 'left', height: '20px' }}>
              {unit === 'us' ? 'US standard' : 'metric'}
            </TrackingListTdInputText>
          </TrackingListTdInput>

          <TrackingListTd>
            {/* <div style={{ marginRight: '30px' }}> */}
            {previewKcal()}kcal/{unit === 'us' ? 'lb' : 'g'}
            {/* </div> */}
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
        // <div style={{ display: 'flex' }}>
        //   <div style={{ display: 'flex' }}>
        //     <div style={{ marginRight: '30px' }}>{food.name}</div>
        //     <ValidationTextField
        //       id="outlined-name"
        //       label="weight"
        //       value={weight}
        //       onChange={onChange}
        //       style={{ marginRight: '30px' }}
        //       helperText={
        //         !isWeightNumber ? (
        //           <span>Please enter a number only</span>
        //         ) : (
        //           isWeightEmpty && <span>Please enter a weight</span>
        //         )
        //       }
        //     />
        //     <Switch
        //       checked={checked}
        //       onChange={handleSwitch}
        //       inputProps={{ 'aria-label': 'controlled' }}
        //     />
        //     {unit === 'us' ? 'US standard' : 'metric'}
        //     <div style={{ marginRight: '30px' }}>
        //       {previewKcal()}kcal/{unit === 'us' ? 'lb' : 'g'}
        //     </div>
        //   </div>
        //   <div>
        //     <Button variant="contained" type="button" onClick={handleCheck}>
        //       Check
        //     </Button>
        //     <Button variant="contained" type="button" onClick={handleCancel}>
        //       Cancel
        //     </Button>
        //   </div>
        // </div>
        <TrackingListTr>
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
