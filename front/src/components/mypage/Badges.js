import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import * as Api from '../../api';
import Tooltip from './Tooltip';
import { Container, Grid } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState } from '../../atoms';
import { useParams } from 'react-router-dom';

// const BadgesContainer = styled.div`
//   width: 1203px;
//   height: 700px;
//   border-radius: 15px;
//   background-color: #94d82d;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const BadgesWrap = styled.div`
//   width: 1100px;
//   height: 600px;

//   display: flex;
//   gap: 20px 8%;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;

//   /* background-color: white; */

//   position: absolute;
// `;

const BadgesText = styled.div`
  width: 1203px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  left: 30px;
`;

const Badges = () => {
  // const [badgesList, setBadgesList] = useRecoilState(badgesState);

  const user = useRecoilValue(userInfoState);
  const params = useParams();
  const [badges, setBadges] = useState([]);
  const [award, setAward] = useState([]);

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
  useEffect(() => {
    Api.get(`badges`).then((res) => setBadges(res.data));
  }, []);

  useEffect(() => {
    if (params.user_id) {
      const userId = params.user_id;
      Api.get('awards', userId).then((res) => setAward(res.data));
    } else {
      Api.get('awards', user._id).then((res) => setAward(res.data));
    }
  }, [user]);

  // const userId = params.user_id;
  // console.log(userId);

  // useEffect(() => {
  //   Api.get('awards', user._id).then((res) => setAward(res.data));
  // }, [user]);

  // useEffect(() => {
  //   console.log('유저어워드', award);
  // }, [award]);
  return (
    <div>
      <BadgesText>Badges</BadgesText>

      <Container sx={{ marginTop: 2, bgcolor: '#94d82d', borderRadius: 3 }}>
        <Grid container spacing={1}>
          {badges.map((badge, idx) => {
            const isLock = award[badge.award_name] < badge.level;

            return (
              <Grid item sx={{ margin: 2 }} key={idx}>
                <Tooltip
                  badgeName={badge.badge_name}
                  awardName={badge.award_name}
                  src={badge.src}
                  badgeLevel={badge.level}
                  description={badge.description}
                  isLock={isLock}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Badges;
