import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultCelenderChart from './jandi/DefaultCelenderChart.js';
import jandiData from './jandi/data.json';
import * as Api from '../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';
import { useParams } from 'react-router-dom';

const JandiContainer = styled.div`
  position: relative;
  width: 1300px;
  height: auto;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 3.64393px 27.3295px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(27.3295px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 36.4393px;
`;

const JandiText = styled.div`
  font-family: 'Jost', sans-serif;
  font-weight: 800;
  font-style: italic;
  width: 1203px;
  height: 50px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  left: 30px;

  padding-top: 10px;
`;

const Jandi = () => {
  const user = useRecoilValue(userInfoState);
  const params = useParams();
  const [data, setData] = useState([]);
  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    if (params.user_id) {
      const userId = params.user_id;

      Api.get('heatmap', userId).then((res) => {
        if (res.data[0].record === undefined) {
          setEmptyData(false);
        } else {
          setData(res.data[0].record);
          setEmptyData(true);
          // console.log('잔디데이터 들어오는 값', res.data[0].record);
        }
      });
    } else {
      Api.get('heatmap', user._id).then((res) => {
        if (res.data[0].record === undefined) {
          setEmptyData(false);
        } else {
          setData(res.data[0].record);
          setEmptyData(true);
        }
      });
    }
  }, [user, params]);

  // console.log('잔디데이터 받아서 넣은 값', data);

  // Api.get('heatmap', user._id).then((res) => {
  //   console.log(res.data.record);

  //   if (res.data.record === undefined) {
  //     setEmptyData(false);
  //   } else {
  //     setData(res.data.record);
  //     setEmptyData(true);
  //   }
  // });

  return (
    <div>
      <JandiText>HeatMap</JandiText>
      <JandiContainer>
        {emptyData ? (
          <DefaultCelenderChart data={data} /> //진짜 데이터
        ) : (
          <DefaultCelenderChart data={jandiData} /> //더미 데이터
        )}
      </JandiContainer>
    </div>
  );
};

export default Jandi;
