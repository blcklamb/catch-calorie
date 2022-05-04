import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useRecoilState } from 'recoil';
import { trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function TrackingFoodList({ food, isTrackingPage }) {
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [isEditing, setIsEditing] = useState(false);
  
  const [gram, setGram] = useState(food.gram);

  const [isGramEmpty, setIsGramEmpty] = useState(false);
  const [isGramNumber, setIsGramNumber] = useState(true);

  useEffect(() => {
    setGram(food.gram);
  }, [food.gram]);

  const onChange = (e) => {
    setGram(e.target.value);
  };

  const handleCheck = async (e) => {
    setIsGramEmpty(!Number(gram));
    setIsGramNumber(!isNaN(gram));

    try {
      if (Number(gram) && !isNaN(gram)) {
        await Api.put('tracking/food', {
          id: food.id,
          gram: gram,
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
    setGram(food.gram);

    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    await Api.delete(`tracking/food/${food.id}`);

    setTrackingUpdate(!trackingUpdate);
  };

  const previewKcal = () => {
    // gram에 숫자가 아닌 값이 입력되면 미리보기 칼로리 0
    if (!isNaN(gram)) {
      return Math.round((gram * food.calorie) / food.gram);
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
              label="gram"
              value={gram}
              onChange={onChange}
              style={{ marginRight: '30px' }}
              helperText={
                !isGramNumber ? (
                  <span>Please enter a number only</span>
                ) : (
                  isGramEmpty && <span>Please enter a gram</span>
                )
              }
            />
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
            <div style={{ marginRight: '30px' }}>{food.gram}g</div>
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
