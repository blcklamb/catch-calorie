import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Footer from '../Footer';
import Header from '../Header';
import UserCard from '../user/UserCard';
import * as Api from '../../api';
import {
  RegisterCircleGreen1,
  RegisterCircleGreen2,
  RegisterCircleRed1,
  RegisterCircleRed2,
} from '../styledCompo/RegisterStyle';

const Network = () => {
  const [userList, setUserList] = useState([]);
  console.log(userList);

  useEffect(() => {
    async function getUserList() {
      const res = await Api.get('users');
      const usersData = res.data;
      setUserList(usersData);
    }
    getUserList();
  }, []);

  return (
    <>
      <Header></Header>
      {/* ///@ 동그라미들 */}
      <RegisterCircleRed1></RegisterCircleRed1>
      <RegisterCircleRed2></RegisterCircleRed2>
      <RegisterCircleGreen1></RegisterCircleGreen1>
      <RegisterCircleGreen2></RegisterCircleGreen2>
      <Container sx={{ marginBottom: 30, marginTop: 30 }}>
        <Grid container spacing={4}>
          {userList.map((eachUserId, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <UserCard currentUserInfo={eachUserId} isNetworkPage={true}></UserCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Network;
