import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultCelenderChart from './jandi/DefaultCelenderChart.js';
import data from './jandi/data.json';
import * as Api from '../../api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

const JandiContainer = styled.div`
  position: relative;
  width: 1203px;
  height: 387px;
  border-radius: 15px;
  background-color: #94d82d;
  bottom: 0px;
`;

const JandiText = styled.div`
  width: 1203px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  left: 30px;
`;

const Jandi = () => {
  //   const user = useRecoilValue(userInfoState);
  //   const [data, setData] = useState('');

  //   useEffect(() => {
  //     Api.get('heatmap', user._id).then((res) => {
  //       setData(res.user);
  //     });
  //   }, []);
  return (
    <div>
      <JandiText>HeatMap</JandiText>
      <JandiContainer>
        <DefaultCelenderChart data={data} />
      </JandiContainer>
    </div>
  );
};

export default Jandi;
