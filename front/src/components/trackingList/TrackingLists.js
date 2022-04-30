import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import { useRecoilState } from 'recoil';
import { trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function TrackingLists() {
  const params = useParams();

  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [trackingList, setTrackingList] = useState('');

  useEffect(() => {
    Api.get(`tracking/${params.user_id}`).then((res) => {
      setTrackingList(res.data);
    });
  }, [trackingUpdate]);

  return (
    <>
      <h1>Tracking List</h1>
      <div>
        <h1>Food</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '30px' }}>
            <h2>Food</h2>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h2>Amount Eaten</h2>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h2>Intake Calories</h2>
          </div>
        </div>
        {trackingList.food_record?.length ? (
          trackingList.food_record.map((food) => {
            return <TrackingFoodList food={food} />;
          })
        ) : (
          <div>No Food Tracking</div>
        )}
      </div>
      <div>
        <h1>Exercise</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '30px' }}>
            <h2>Exercise</h2>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h2>Time Exercised</h2>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h2>Consumed Calories</h2>
          </div>
        </div>
        {trackingList.exer_record?.length ? (
          trackingList.exer_record.map((exercise) => {
            return <TrackingExerciseList exercise={exercise} />;
          })
        ) : (
          <div>No Exercise Tracking</div>
        )}
      </div>
    </>
  );
}

export default TrackingLists;
