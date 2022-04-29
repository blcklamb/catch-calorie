import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import * as Api from '../../api';

function TrackingExerciseList({ exercise }) {
  const [isEditing, setIsEditing] = useState(false);
  const [trackingList, setTrackingList] = useState('');
  const [hour, setHour] = useState(parseInt(exercise.minute / 60));
  const [minute, setMinute] = useState(exercise.minute % 60);
  // const [minute, setMinute] = useState(exercise.minute);

  const handleCheck = async (e) => {
    await Api.put('tracking/exer', {
      id: exercise.id,
      minute: Number(hour) * 60 + Number(minute),
    });
    setIsEditing(false);
  };

  const handleModify = (e) => {
    setIsEditing(true);
  };

  const handleDelete = (e) => {
    Api.delete(`tracking/exer/${exercise.id}`);
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
              // defaultValue={parseInt(exercise.minute / 60)}
              onChange={(e) => setHour(e.target.value)}
              style={{ marginRight: '30px' }}
            />
            <TextField
              id="outlined-name"
              label="minute"
              value={minute}
              // defaultValue={exercise.minute % 60}
              onChange={(e) => setMinute(e.target.value)}
              style={{ marginRight: '30px' }}
            />
          <div style={{ marginRight: '30px' }}>{exercise.calorie}kcal</div>
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

export default TrackingExerciseList;
