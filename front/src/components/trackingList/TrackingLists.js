import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import { Section, GraphContainer } from '../styledCompo/mainStyle';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState, trackingState, trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function TrackingLists() {
  const user = useRecoilValue(userInfoState);
  const params = useParams();

  const tracking = useRecoilValue(trackingState);
  // const [tracking, setTracking] = useState('')
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const isTrackingPage = window.location.href.split('/')[3];

  // useEffect(() => {
  //   Api.get(`tracking/${params.user_id}`).then((res) => {
  //     setTracking(res.data);
  //   });
  // }, [trackingUpdate]);

  return (
    <>
      <Section>
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
          {tracking.food_record?.length ? (
            tracking.food_record.map((food) => {
              return <TrackingFoodList food={food} isTrackingPage={isTrackingPage} />;
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
          {tracking.exer_record?.length ? (
            tracking.exer_record.map((exercise) => {
              return <TrackingExerciseList exercise={exercise} isTrackingPage={isTrackingPage} />;
            })
          ) : (
            <div>No Exercise Tracking</div>
          )}
        </div>
      </Section>
    </>
  );
}

export default TrackingLists;
