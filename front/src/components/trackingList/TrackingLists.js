import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import {
  Section,
  TrackingListTable,
  TrackingListThName,
  TrackingListThContent,
  TrackingListThAction,
  TrackingListThEnd,
  TrackingListTbody,
  TrackingListTd,
} from '../styledCompo/mainStyle';

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
        <div style={isTrackingPage !== 'tracking' ? { height: '480px', overflow: 'auto' } : {}}>
          <div>
            <TrackingListTable>
              <thead>
                <tr>
                  <TrackingListThName>
                    <h2>Food</h2>
                  </TrackingListThName>
                  <TrackingListThContent>
                    <h2>Amount</h2>
                  </TrackingListThContent>
                  <TrackingListThContent>
                    <h2>Intake Calories</h2>
                  </TrackingListThContent>
                  {isTrackingPage === 'tracking' && (
                    <>
                      <TrackingListThAction>
                        <h2>Edit</h2>
                      </TrackingListThAction>
                      <TrackingListThEnd>
                        <h2>Del</h2>
                      </TrackingListThEnd>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {tracking.food_record?.length ? (
                  // <tr>
                  tracking.food_record.map((food) => {
                    return <TrackingFoodList food={food} isTrackingPage={isTrackingPage} />;
                  })
                ) : (
                  // </tr>
                  <tr>
                    <div>No Food Tracking</div>
                  </tr>
                )}
              </tbody>
            </TrackingListTable>
            <div style={{ display: 'flex' }}></div>
          </div>
          <div>
            <TrackingListTable>
              <thead>
                <tr>
                  <TrackingListThName>
                    <h2>Exercise</h2>
                  </TrackingListThName>
                  <TrackingListThContent>
                    <h2>Time</h2>
                  </TrackingListThContent>
                  <TrackingListThContent>
                    <h2>Consumed Calories</h2>
                  </TrackingListThContent>
                  <TrackingListThAction>
                    <h2>Edit</h2>
                  </TrackingListThAction>
                  <TrackingListThEnd>
                    <h2>Del</h2>
                  </TrackingListThEnd>
                </tr>
              </thead>
              <tbody>
                {tracking.exer_record?.length ? (
                  tracking.exer_record.map((exercise) => {
                    return (
                      <TrackingExerciseList exercise={exercise} isTrackingPage={isTrackingPage} />
                    );
                  })
                ) : (
                  <tr>
                    <div>No Exercise Tracking</div>
                  </tr>
                )}
              </tbody>
            </TrackingListTable>
          </div>
        </div>
      </Section>
    </>
  );
}

export default TrackingLists;
