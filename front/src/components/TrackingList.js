import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as Api from '../api';

function TrackingList({ foodSelected, setFoodSelected, totalFood, setTotalFood }) {
  const [trackingList, setTrackingList] = useState('');

  const id = '626751e37f0a6752662edaf6';

  useEffect(() => {
    Api.get(`tracking/${id}`).then((res) => setTrackingList(res.data));
  }, []);

  return (
    <>
      트래킹 리스트
      {/* {console.log(trackingList)} */}
      {/* {console.log(trackingList.food_record)} */}
      {/* {console.log(trackingList && trackingList.food_record.map((list) => list))} */}
      {trackingList &&
        trackingList.food_record.map((list) => {
          return [list.food, list.calorie];
        })}
    </>
  );
}

export default TrackingList;
