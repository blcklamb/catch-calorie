import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useRecoilState } from 'recoil';
import { trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function TrackingExerciseList({ exercise, isGetList, setIsGetList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [hour, setHour] = useState(parseInt(exercise.minute / 60));
  const [minute, setMinute] = useState(exercise.minute % 60);

  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const handleCheck = async (e) => {
    await Api.put('tracking/exer', {
      id: exercise.id,
      minute: Number(hour) * 60 + Number(minute),
    });

    setIsEditing(false);
    setIsGetList(!isGetList);
    setTrackingUpdate(!trackingUpdate);
  };

  const handleModify = (e) => {
    setIsEditing(true);
  };

  const handleCancle = (e) => {
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    Api.delete(`tracking/exer/${exercise.id}`);

    setIsGetList(!isGetList);
    setTrackingUpdate(!trackingUpdate);
  };

  return (
    <>
      {isEditing ? (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px' }}>{exercise.name}</div>
            <TextField
              id="outlined-name"
              label="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              style={{ marginRight: '30px' }}
            />
            <TextField
              id="outlined-name"
              label="minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              style={{ marginRight: '30px' }}
            />
            <div style={{ marginRight: '30px' }}>{exercise.calorie}kcal</div>
            <Button variant="contained" type="submit" onClick={handleCheck}>
              Check
            </Button>
            <Button variant="contained" type="submit" onClick={handleCancle}>
              Cancle
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px' }}>{exercise.name}</div>
            <div style={{ marginRight: '30px' }}>
              {parseInt(exercise.minute / 60)}H {exercise.minute % 60}M
            </div>
            <div style={{ marginRight: '30px' }}>{exercise.calorie}kcal</div>
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

export default TrackingExerciseList;
