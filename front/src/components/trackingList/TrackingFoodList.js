import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import * as Api from '../../api';

function TrackingFoodList({ food }) {
  const [isEditing, setIsEditing] = useState(false);
  const [trackingList, setTrackingList] = useState('');
  const [gram, setGram] = useState(food.gram);

  const handleCheck = async (e) => {
    await Api.put('tracking/food', {
      id: food.id,
      gram: gram,
    });
    setIsEditing(false);
  };

  const handleModify = (e) => {
    setIsEditing(true);
  };

  const handleDelete = (e) => {
    Api.delete('tracking/food', {
      id: food.id,
    });
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
              onChange={(e) => setGram(e.target.value)}
              style={{ marginRight: '30px' }}
            />
            <div style={{ marginRight: '30px' }}>{food.calorie}kcal</div>
          </div>
          <div>
            <Button variant="contained" type="submit" onClick={handleCheck}>
              Check
            </Button>
            <Button variant="contained" type="submit" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px' }}>{food.name}</div>
            <div style={{ marginRight: '30px' }}>{food.gram}g</div>
            <div style={{ marginRight: '30px' }}>{food.calorie}kcal</div>
            <Button variant="contained" type="submit" onClick={handleModify}>
              Modify
            </Button>
            <Button variant="contained" type="submit" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* 트래킹 리스트 데모
      {console.log(trackingList)}
      <div>
        <h1>Food</h1>
        {trackingList &&
          trackingList.food_record.map((food) => {
            return (
              <div>
                {food.name}
                {food.calorie}
                <Button variant="contained" type="submit" onClick={() => handleModify}>
                  Modify
                </Button>
                <Button variant="contained" type="submit">
                  Delete
                </Button>
              </div>
            );
          })}
      </div>
      <div>
        <h1>Exercise</h1>
        {trackingList &&
          trackingList.exer_record.map((exercise) => {
            return (
              <div>
                {exercise.name}
                {exercise.calorie}
                <Button variant="contained" type="submit">
                  Modify
                </Button>
                <Button variant="contained" type="submit">
                  Delete
                </Button>
              </div>
            );
          })}
      </div> */}
    </>
  );
}

export default TrackingFoodList;
