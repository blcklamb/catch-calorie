import React, { useState, useEffect, useMemo } from 'react';
import * as Api from '../../api';
import styled from 'styled-components';
import Yoga from './yoga.png';
import { Container, Grid } from '@mui/material';

import Tooltip from '../Tooltip';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import { useParams } from 'react-router-dom';

const BadgesContainer = styled.div`
  width: 1203px;
  height: 700px;
  border-radius: 15px;
  background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgesWrap = styled.div`
  width: 1100px;
  height: 600px;

  display: flex;
  gap: 20px 8%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  /* background-color: white; */

  position: absolute;
`;

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
  const user = useRecoilValue(userInfoState);
  const params = useParams();
  const [badges, setBadges] = useState([]);
  const badgesAr = useMemo(
    () =>
      Object.keys(badges).filter((item) => {
        if (item === '_id' || item === 'user_id' || item === '__v') {
          return false;
        } else {
          return true;
        }
      }),
    [badges],
  );

  useEffect(() => {
    // Api.get('users', user._id).then((res) => setBadges(res.data.icon));
    Api.get('awards', user._id).then((res) => setBadges(res.data));
  }, [user]);

  return (
    <div>
      <BadgesText>Badges</BadgesText>

      <Container sx={{ marginTop: 2, bgcolor: '#94d82d', borderRadius: 3 }}>
        <Grid container spacing={1}>
          {badgesAr.map((badgeName) => {
            let isLock = true;
            let imgNum = '';

            if (badges[badgeName] === 0) {
              isLock = true;
            } else {
              isLock = false;
              imgNum = badges[badgeName];
            }
            // console.log(badgeName, badges[badgeName], isLock, imgNum);
            return (
              <Grid item sx={{ margin: 3 }} key={badgeName}>
                <Tooltip badgeName={badgeName} badges={badges} isLock={isLock} imgNum={imgNum} />
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container spacing={1}>
          <Grid spacing={3} sx={{ margin: 3 }}>
            <Tooltip />
          </Grid>
          <Grid spacing={3} sx={{ margin: 3 }}>
            <Tooltip />
          </Grid>
          <Grid spacing={3} sx={{ margin: 3 }}>
            <Tooltip />
          </Grid>
          <Grid spacing={3} sx={{ margin: 3 }}>
            <Tooltip />
          </Grid>
          <Grid spacing={3} sx={{ margin: 3 }}>
            <Tooltip />
          </Grid>
        </Grid> */}
      </Container>

      {/* <BadgesContainer>
        <BadgesWrap>
          <Tooltip />
          <Tooltip />
          <Tooltip />
          <Tooltip />
          <Tooltip />
          <Tooltip />
        </BadgesWrap>
      </BadgesContainer> */}
    </div>
  );
};

export default Badges;
