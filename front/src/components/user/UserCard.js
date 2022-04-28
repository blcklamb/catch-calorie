import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import {
  BadgesContainer,
  UserContainer,
  UserCardFrame,
  UserBodyInfo,
  UserBtnInfo,
  UserBadgeImgInfo,
  ColorButton,
} from '../styledCompo/uesrStyle';

//Mui
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function User({ currentUserInfo, isEditable }) {
  const user = useRecoilValue(userInfoState);
  const [curUser, setCurUser] = useState(currentUserInfo);

  const navigate = useNavigate();

  return (
    <>
      <BadgesContainer>
        <UserContainer>
          <UserCardFrame>
            <UserBodyInfo>
              <Typography variant="h6">height/weight</Typography>
              <br></br>
              <Typography variant="h3">200/100</Typography>
            </UserBodyInfo>
            <UserBadgeImgInfo>
              <img src="/runner.png" alt="badge" style={{ width: 300 }}></img>
            </UserBadgeImgInfo>
            <UserBtnInfo>
              {isEditable && (
                <div>
                  <ColorButton sx={{ width: 120, height: 60 }} onClick={() => navigate('/users')}>
                    Edit info
                  </ColorButton>
                  <ColorButton sx={{ width: 120, height: 60 }}> Change PW</ColorButton>
                </div>
              )}
            </UserBtnInfo>
          </UserCardFrame>
          <UserCardFrame></UserCardFrame>
        </UserContainer>
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card> */}
      </BadgesContainer>
    </>
  );
}

export default User;
