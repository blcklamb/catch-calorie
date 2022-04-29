import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import * as Api from '../../api';

function TrackingLists() {
  const params = useParams();

  const [trackingList, setTrackingList] = useState('');
  const [isGetList, setIsGetList] = useState(true);

  useEffect(() => {
    Api.get(`tracking/${params.user_id}`).then((res) => {
      setTrackingList(res.data);
    });
  }, [isGetList]);

  return (
    <>
      <h1>Tracking List</h1>
      <div>
        <h1>Food</h1>
        {trackingList.food_record?.length ? (
          trackingList.food_record.map((food) => {
            return (
              <TrackingFoodList food={food} isGetList={isGetList} setIsGetList={setIsGetList} />
            );
          })
        ) : (
          <div>No Food Tracking</div>
        )}
      </div>
      <div>
        <h1>Exercise</h1>
        {trackingList.exer_record?.length ? (
          trackingList.exer_record.map((exercise) => {
            return (
              <TrackingExerciseList
                exercise={exercise}
                isGetList={isGetList}
                setIsGetList={setIsGetList}
              />
            );
          })
        ) : (
          <div>No Exercise Tracking</div>
        )}
      </div>
    </>
  );
}

export default TrackingLists;
