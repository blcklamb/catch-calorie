import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import * as Api from '../../api';
import Tooltip from './Tooltip';
import { Container, Grid, shadows } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState, BadgesState } from '../../atoms';
import { useParams } from 'react-router-dom';

const BadgesContainer = styled.div`
  width: 1205px;
  height: 650px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 3.64393px 27.3295px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(27.3295px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 36.4393px;
`;

const BadgesText = styled.div`
  font-family: 'Jost', sans-serif;
  font-weight: 800;
  font-style: italic;
  width: 20px;
  height: 50px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  left: 30px;

  padding-top: 10px;
`;

const Badges = ({ currentUserInfo }) => {
  // const [badgesList, setBadgesList] = useRecoilState(badgesState);

  const user = useRecoilValue(userInfoState);
  const params = useParams();
  const [badges, setBadges] = useRecoilState(BadgesState);
  const [award, setAward] = useState([]);

  const isEditable = useMemo(() => currentUserInfo?._id === user?._id, [currentUserInfo, user]);

  // const awardNameAr = useMemo(
  //   () =>
  //     Object.keys(award).filter((item) => {
  //       if (item === '_id' || item === 'user_id' || item === '__v') {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }),
  //   [award],
  // );

  // useEffect(() => {
  //   Api.get(`badges`).then((res) => setBadges(res.data));
  // }, []);

  // const userId = params.user_id;
  // console.log(userId);

  // useEffect(() => {
  //   Api.get('awards', user._id).then((res) => setAward(res.data));
  // }, [user]);

  // useEffect(() => {
  //   console.log('뱃지데이터', badges);
  // }, [badges]);

  useEffect(() => {
    if (params.user_id) {
      const userId = params.user_id;
      Api.get('awards', userId).then((res) => setAward(res.data));
    } else {
      Api.get('awards', user._id).then((res) => setAward(res.data));
    }
  }, [params.user_id, user]);

  return (
    <div style={{ zIndex: '55' }}>
      <BadgesText>Badges</BadgesText>
      <BadgesContainer>
        <Container title sx={{ marginTop: 2 }}>
          <Grid container spacing={3.2}>
            {badges.map((badge, idx) => {
              const isLock = award[badge.award_name] < badge.level; //유저 어워드 정보의 각 뱃지 레벨이 뱃지 리스트 정보의 레벨 보다 낮으면 락 걸기

              return (
                <Grid item sx={{ margin: 0.1 }} key={idx}>
                  <Tooltip
                    badgeName={badge.badge_name}
                    awardName={badge.award_name}
                    src={badge.src}
                    badgeLevel={badge.level}
                    description={badge.description}
                    isLock={isLock}
                    currentUserInfo={currentUserInfo}
                    isEditable={isEditable}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </BadgesContainer>
      {/* <Container sx={{ marginTop: 2, bgcolor: '#94d82d', borderRadius: 3, boxShadow: 3 }}> */}
      {/* </Container> */}
    </div>
  );
};

export default Badges;
