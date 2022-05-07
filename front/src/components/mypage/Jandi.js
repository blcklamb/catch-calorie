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
  width: 1205px;
  height: auto;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 5.33376px 40.0032px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10.0032px);
  z-index: 55;
  border-radius: 36.4393px;

  @media screen and (max-width: 1440px) {
    direction: vertical;
  }
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

  z-index: 55;
`;

const Jandi = () => {
  const user = useRecoilValue(userInfoState);
  const params = useParams();
  const [data, setData] = useState([]);
  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    if (params.user_id) {
      const userId = params.user_id;

      console.log('userId', userId);
      // params로 들어오는 경우 데이터가 빈배열이면 더미데이터
      Api.get('heatmap', userId)
        .then((res) => {
          if (res?.data[0].record === []) {
            setEmptyData(false);
            // params로 들어오는 경우 데이터가 있으면 진짜 데이터 (res.data[0].record)
          } else {
            setData(res?.data[0].record);
            setEmptyData(true);
            console.log('잔디데이터 들어오는 값', res.data[0].record);
          }
        })
        .catch(console.log);
    } else {
      console.log(user._id);
      // 본인 아이디로 들어오는 경우 데이터가 빈배열이면 더미데이터
      Api.get('heatmap', user._id)
        .then((res) => {
          if (res?.data[0].record === []) {
            setEmptyData(false);

            // 본인 아이디로 들어오는 경우 데이터가 있으면 진짜 데이터 (res.data[0].record)
          } else {
            setData(res?.data[0].record);
            setEmptyData(true);
          }
        })
        .catch(console.log);
    }
  }, [user, params]);

  console.log('잔디데이터 받아서 넣은 값', data);

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
