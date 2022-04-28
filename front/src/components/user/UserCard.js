import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import {
  BadgesContainer,
  UserContainer,
  UserCardFrame,
  UserBodyInfo,
  UserBadgeImgInfo,
  ColorButton,
} from '../styledCompo/uesrStyle';

//Mui
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

function User({ currentUserInfo }) {
  const user = useRecoilValue(userInfoState);
  const [curUser, setCurUser] = useState(currentUserInfo);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    console.log(currentUserInfo);
    console.log(user);
    if (curUser?._id === user._id) {
      setIsEditable(true);
    } else {
      return;
    }
  }, [curUser, user]);

  return (
    <>
      <BadgesContainer>
        <UserContainer>
          <UserCardFrame>
            <UserBodyInfo>
              <Typography variant="h2">200/100</Typography>
            </UserBodyInfo>
            <UserBadgeImgInfo>
              <img src="/runner.png" alt="badge" style={{ width: 300 }}></img>
            </UserBadgeImgInfo>
            <UserBodyInfo>
              <div>
                <ColorButton sx={{ width: 120, height: 60 }}> Edit info</ColorButton>
                <ColorButton sx={{ width: 120, height: 60 }}> Change PW</ColorButton>
              </div>
            </UserBodyInfo>
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
