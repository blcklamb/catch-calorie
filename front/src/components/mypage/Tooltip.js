import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, Button, Popup, Grid } from 'semantic-ui-react';
import * as Api from '../../api';

import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState } from '../../atoms';

import Lock from '../../image/lock5.png';
import { useAlert } from 'react-alert';

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

const Badgesboxs = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 18px;
  background: #ecf8d9;

  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    box-shadow: inset 8px 8px 16px #c88383, inset -8px -8px 16px #faa3a3;
  }
`;

const Tooltip = ({
  badgeName,
  awardName,
  src,
  badgeLevel,
  description,
  isLock,
  currentUserInfo,
  isEditable,
}) => {
  const user = useRecoilValue(userInfoState);
  const params = useParams();
  const Alert = useAlert();
  // const userId = params.user_id;

  // useEffect(() => {
  //   Api.get('awards', user._id).then((res) => setAward(res.data));
  // }, []);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  //뱃지 변경 버튼 누르면 전역 유저 정보 state에 뱃지 아이콘 이름 업데이트
  const changeBadgeHandler = async () => {
    await Api.put(`users/${userInfo._id}`, {
      name: userInfo?.name,
      // gender: userInfo.gender,
      height: userInfo?.height,
      weight: userInfo?.weight,
      unit: userInfo?.unit,
      open: userInfo?.open,
      icon: src,
      status: userInfo?.status,
    }).then((res) => {
      setUserInfo(res.data);
      // alert('Your Badge has been successfully changed.');
      Alert.success('Your Badge has been successfully changed.');
    });
  };

  return (
    <Popup
      style={{
        borderRadius: '18px',
        backgroundColor: '#E1F4C4',
        border: 'none',
        fontFamily: 'Roboto',
        zIndex: 80,
      }}
      trigger={
        <Badgesboxs>
          <img src={`${src}`} style={{ width: 105 }} alt="뱃지"></img>
          {isLock && (
            <img
              src={Lock}
              style={{ width: 100, position: 'absolute', opacity: '0.5', borderRadius: '18px' }}
              alt="자물쇠"
            ></img>
          )}
        </Badgesboxs>
      }
      flowing
      hoverable
    >
      <Grid centered divided columns={1}>
        <Grid.Column textAlign="center">
          <Header as="h2">{`${badgeName}`}</Header>
          <p>
            <b>Level: {`${badgeLevel}`}</b> <br />
            {description === undefined ? 'Basic Badge' : `${description}`}
          </p>
          {isEditable && !isLock ? ( //isEditable이 true일 때(접속한 사람 본인일 때) , isLock이 false일 때만(자물쇠 없을 때) 버튼 노출
            <Button
              style={{ borderRadius: '8px', backgroundColor: '#94D82D' }}
              onClick={changeBadgeHandler}
            >
              Change your badge
            </Button>
          ) : (
            <div></div>
          )}
        </Grid.Column>
      </Grid>
    </Popup>
  );
};

export default Tooltip;
