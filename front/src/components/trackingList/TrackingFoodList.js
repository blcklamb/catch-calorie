import React, { useState } from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import * as Api from '../../api';

function TrackingFoodList({ food, isGetList, setIsGetList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [gram, setGram] = useState(food.gram);

  const handleCheck = async (e) => {
    await Api.put('tracking/food', {
      id: food.id,
      gram: gram,
    });

    setIsEditing(false);
    setIsGetList(!isGetList);
  };

  const handleModify = (e) => {
    setIsEditing(true);
  };

  const handleDelete = async (e) => {
    await Api.delete(`tracking/food/${food.id}`);

    setIsGetList(!isGetList);
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
    </>
  );
}

export default TrackingFoodList;
