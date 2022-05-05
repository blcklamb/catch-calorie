import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useRecoilState } from 'recoil';
import { trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function TrackingExerciseList({ exercise, isTrackingPage }) {
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [isEditing, setIsEditing] = useState(false);

  const [hour, setHour] = useState(parseInt(exercise.minute / 60));
  const [minute, setMinute] = useState(exercise.minute % 60);

  const [isTimeEmpty, setIsTimeEmpty] = useState(false);
  const [isHourNumber, setIsHourNumber] = useState(true);
  const [isMinNumber, setIsMinNumber] = useState(true);

  useEffect(() => {
    setHour(parseInt(exercise.minute / 60));
    setMinute(exercise.minute % 60);
  }, [exercise.minute]);

  const onChange = (e) => {
    setHour(e.target.value);
  };

  const handleCheck = async (e) => {
    setIsTimeEmpty(!Number(hour) && !Number(minute));

    setIsHourNumber(!isNaN(hour));
    setIsMinNumber(!isNaN(minute));

    try {
      if (!(!Number(hour) && !Number(minute)) && !isNaN(hour) && !isNaN(minute)) {
        await Api.put('tracking/exer', {
          id: exercise.id,
          minute: Number(hour) * 60 + Number(minute),
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
    setHour(parseInt(exercise.minute / 60));
    setMinute(exercise.minute % 60);

    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    await Api.delete(`tracking/exer/${exercise.id}`);

    setTrackingUpdate(!trackingUpdate);
  };

  const previewKcal = () => {
    //hour, minute에 숫자가 아닌 값이 입력되면 미리보기 칼로리 0
    if (Number(hour) > 0 || Number(minute) > 0) {
      return Math.round(
        (exercise.calorie * (Number(hour) * 60 + Number(minute))) / exercise.minute,
      );
    } else {
      return 0;
    }
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
              onChange={onChange}
              style={{ marginRight: '30px' }}
              helperText={
                !isHourNumber || !isMinNumber ? (
                  <span>Please enter a number only</span>
                ) : (
                  isTimeEmpty && <span>Please enter a time</span>
                )
              }
            />
            <TextField
              id="outlined-name"
              label="minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              style={{ marginRight: '30px' }}
            />
            <div style={{ marginRight: '30px' }}>{previewKcal()}kcal</div>
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
            <div style={{ marginRight: '30px' }}>{exercise.name}</div>
            <div style={{ marginRight: '30px' }}>
              {parseInt(exercise.minute / 60)}H {exercise.minute % 60}M
            </div>
            <div style={{ marginRight: '30px' }}>{exercise.calorie}kcal</div>
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

export default TrackingExerciseList;
