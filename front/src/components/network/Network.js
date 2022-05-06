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

      <Container sx={{ height: 5000, marginTop: 20 }}>
        <Grid container spacing={4}>
          {userList.map((eachUserId, index) => (
            <Grid item xs={3} key={index}>
              <UserCard currentUserInfo={eachUserId} isNetworkPage={true}></UserCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default Network;
