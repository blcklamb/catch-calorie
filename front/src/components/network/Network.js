import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Footer from '../Footer';
import Header from '../Header';
import UserCard from '../user/UserCard';
import * as Api from '../../api';

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
      <Container sx={{ marginBottom: 30, marginTop: 20 }}>
        <Grid container spacing={4}>
          {userList.map((eachUserId, index) => (
            <Grid item xs={6} md={3} key={index}>
              <UserCard currentUserInfo={eachUserId} isNetworkPage={true}></UserCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Network;
