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

  // useEffect(() => {
  //   if (params.user_id) {
  //     // 네트워크에서 다른 유저를 눌러서 들어온 경우 해당 params를 통해 다른 유저 마이페이지 정보를 가져옴
  //     const userId = params.user_id;

  //     async function getUserInfo(userId) {
  //       const res = await Api.get('users', userId);
  //       const temp = res.data;
  //       setCurrentUserInfo(temp);
  //     }
  //     getUserInfo(userId);
  //   } else {
  //     // 네트워크가 아닌 마이페이 누르기를 통해 들어온 경우 전역에 있는 아이디값을 통해 자신의 마이페이지 정보를 가저옴
  //     console.log(user);
  //     setCurrentUserInfo(user);
  //     // setIsEditable(true);
  //   }
  // }, [params, user]);

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
