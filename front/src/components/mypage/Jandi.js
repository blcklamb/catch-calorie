import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultCelenderChart from './jandi/DefaultCelenderChart.js';
import jandiData from './jandi/data.json';
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
  const user = useRecoilValue(userInfoState);
  const [data, setData] = useState('');
  console.log('jandi', user);

  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    Api.get('heatmap', user._id).then((res) => {
      console.log(res.data.record);

      if (res.data.record === undefined) {
        setEmptyData(false);
      } else {
        setData(res.data.record);
        setEmptyData(true);
      }
    });
  }, []);

  return (
    <div>
      <JandiText>HeatMap</JandiText>
      <JandiContainer>
        {emptyData ? (
          <DefaultCelenderChart data={data} />
        ) : (
          <DefaultCelenderChart data={jandiData} />
        )}
      </JandiContainer>
    </div>
  );
};

export default Jandi;
