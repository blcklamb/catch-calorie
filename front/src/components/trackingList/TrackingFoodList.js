import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

import { useRecoilState } from 'recoil';
import { trackingUpdateState, trackingFoodUnitState } from '../../atoms';

import * as Api from '../../api';

function TrackingFoodList({ food, isTrackingPage }) {
  const convert = require('convert-units');

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
      setUnit('us');
    } else {
      setUnit('non us');
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

    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    await Api.delete(`tracking/food/${food.id}`);

    setTrackingUpdate(!trackingUpdate);
  };

  const previewKcal = () => {
    // gram에 숫자가 아닌 값이 입력되면 미리보기 칼로리 0
    if (!isNaN(weight)) {
      const gram = unit === 'us' ? convert(weight).from('lb').to('g').toFixed(0) : weight;
      
      return Math.round((Number(gram) * food.calorie) / food.gram);
    } else {
      return 0;
    }
  };

  return (
    <>
      {isEditing ? (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px' }}>{food.name}</div>
            <TextField
              id="outlined-name"
              label="weight"
              value={weight}
              onChange={onChange}
              style={{ marginRight: '30px' }}
              helperText={
                !isWeightNumber ? (
                  <span>Please enter a number only</span>
                ) : (
                  isWeightEmpty && <span>Please enter a weight</span>
                )
              }
            />
            <Switch
              checked={checked}
              onChange={handleSwitch}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            {unit === 'us' ? 'US standard' : 'metric'}
            <div style={{ marginRight: '30px' }}>{previewKcal()}kcal</div>
          </div>
          <div>
            <Button variant="contained" type="button" onClick={handleCheck}>
              Check
            </Button>
            <Button variant="contained" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px' }}>{food.name}</div>
            <div style={{ marginRight: '30px' }}>
              {food.gram}
              {unit === 'us' ? 'lb' : 'g'}
            </div>
            <div style={{ marginRight: '30px' }}>{food.calorie}kcal</div>
            {/* 트래킹 페이지에서만 버튼 O */}
            {isTrackingPage === 'tracking' && (
              <div>
                <Button variant="contained" type="button" onClick={handleModify}>
                  Modify
                </Button>
                <Button variant="contained" type="button" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TrackingFoodList;
