import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import {
  Section,
  SectionTitle,
  TrackingListTable,
  TrackingListThName,
  TrackingTableTitle,
  TrackingListThContent,
  TrackingListThAction,
  TrackingListThEnd,
  TrackingListTbody,
  TrackingListTd,
  TrackingListNoTrackingText,
  TrackingListIcon,
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
        <SectionTitle>Tracking List</SectionTitle>
        <div
          style={
            isTrackingPage !== 'tracking'
              ? { height: '480px', overflow: 'auto', padding: '0px 20px' }
              : {}
          }
        >
          <div>
            <TrackingListTable>
              <thead>
                <tr>
                  <TrackingListThName>
                    <TrackingTableTitle>Food</TrackingTableTitle>
                  </TrackingListThName>
                  <TrackingListThContent>
                    <TrackingTableTitle>Amount</TrackingTableTitle>
                  </TrackingListThContent>
                  {isTrackingPage === 'tracking' ? (
                    <>
                      <TrackingListThContent>
                        <TrackingTableTitle>Intake Calories</TrackingTableTitle>
                      </TrackingListThContent>
                      <TrackingListThAction>
                        <TrackingTableTitle>Edit</TrackingTableTitle>
                      </TrackingListThAction>
                      <TrackingListThEnd>
                        <TrackingTableTitle>Del</TrackingTableTitle>
                      </TrackingListThEnd>
                    </>
                  ) : (
                    <TrackingListThContent>
                      <TrackingTableTitle>
                        <TrackingListIcon src="/meal.png" alt="Intake"></TrackingListIcon>
                      </TrackingTableTitle>
                    </TrackingListThContent>
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
                  <th colspan="5">
                    <TrackingListNoTrackingText>No Food Tracking</TrackingListNoTrackingText>
                  </th>
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
                    <TrackingTableTitle>Exercise</TrackingTableTitle>
                  </TrackingListThName>
                  <TrackingListThContent>
                    <TrackingTableTitle>Time</TrackingTableTitle>
                  </TrackingListThContent>
                  {isTrackingPage === 'tracking' ? (
                    <>
                      <TrackingListThAction>
                        <TrackingTableTitle>Edit</TrackingTableTitle>
                      </TrackingListThAction>
                      <TrackingListThEnd>
                        <TrackingTableTitle>Del</TrackingTableTitle>
                      </TrackingListThEnd>
                    </>
                  ) : (
                    <TrackingListThContent>
                      <TrackingTableTitle>
                        <TrackingListIcon src="/burn.png" alt="Consumed"></TrackingListIcon>
                      </TrackingTableTitle>
                    </TrackingListThContent>
                  )}
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
                  <th colspan="5">
                    <TrackingListNoTrackingText>No Exercise Tracking</TrackingListNoTrackingText>
                  </th>
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
