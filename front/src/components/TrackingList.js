import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';

import * as Api from '../api';

function TrackingList({ user }) {
  const [trackingList, setTrackingList] = useState('');

  const testId = '626751e37f0a6752662edaf6';
  const userId = user._id;
  console.log(userId);

  useEffect(() => {
    Api.get(`tracking/${userId}`).then((res) => {
      // console.log(res.data);
      setTrackingList(res.data);
    });
    // Api.get(`tracking/${user._id}`).then((res) => setTrackingList(res.data));
  }, []);

  return (
    <>
      트래킹 리스트 데모
      {console.log(trackingList)}
      <div>
        <h1>Food</h1>
        {trackingList &&
          trackingList.food_record.map((food) => {
            return (
              <div>
                {food.name}
                {food.calorie}
                <Button variant="contained" type="submit">
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
      </div>
    </>
  );
}

export default TrackingList;
