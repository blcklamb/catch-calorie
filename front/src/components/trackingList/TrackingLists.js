import React from 'react';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import {
  SectionTitle,
  TrackingListTable,
  TrackingListThName,
  TrackingTableTitle,
  TrackingListThContent,
  TrackingListThAction,
  TrackingListThEnd,
  TrackingListNoTrackingText,
  TrackingListIcon,
} from '../styledCompo/mainStyle';

import { useRecoilValue } from 'recoil';
import { trackingState } from '../../atoms';

function TrackingLists() {

  const tracking = useRecoilValue(trackingState);

  const isTrackingPage = window.location.href.split('/')[3];

  return (
    <>
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
                tracking.food_record.map((food, i) => {
                  return <TrackingFoodList key={i} food={food} isTrackingPage={isTrackingPage} />;
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    <TrackingListNoTrackingText>No Food Tracking</TrackingListNoTrackingText>
                  </td>
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
                  <TrackingTableTitle>Exercise</TrackingTableTitle>
                </TrackingListThName>
                <TrackingListThContent>
                  <TrackingTableTitle>Time</TrackingTableTitle>
                </TrackingListThContent>
                {isTrackingPage === 'tracking' ? (
                  <>
                    <TrackingListThContent>
                      <TrackingTableTitle>Consumed Calories</TrackingTableTitle>
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
                      <TrackingListIcon src="/burn.png" alt="Consumed"></TrackingListIcon>
                    </TrackingTableTitle>
                  </TrackingListThContent>
                )}
              </tr>
            </thead>
            <tbody>
              {tracking.exer_record?.length ? (
                tracking.exer_record.map((exercise, i) => {
                  return (
                    <TrackingExerciseList
                      key={i}
                      exercise={exercise}
                      isTrackingPage={isTrackingPage}
                    />
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    <TrackingListNoTrackingText>No Exercise Tracking</TrackingListNoTrackingText>
                  </td>
                </tr>
              )}
            </tbody>
          </TrackingListTable>
        </div>
      </div>
    </>
  );
}

export default TrackingLists;
