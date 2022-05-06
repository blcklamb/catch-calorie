import React from 'react';
import { useNavigate } from 'react-router-dom';

//Mui
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

const UserNetworkCard = ({ currentUserInfo }) => {
  const navigate = useNavigate();
  console.log(currentUserInfo.icon);
  return (
    <div style={{ width: 100 + '%', height: 360, backgroundColor: '#ecf8d9', borderRadius: 18 }}>
      <div>
        <div style={{ paddingTop: 20 }}>
          <img
            src={currentUserInfo.icon}
            alt="badge"
            style={{ width: 80 + '%', display: 'block', margin: 'auto' }}
            onClick={() => navigate(`/${currentUserInfo._id}`)}
          ></img>
        </div>
      </div>
      <div style={{ marginLeft: '10px' }}>
        <Typography variant="h5">{currentUserInfo.name}</Typography>
        <Typography>{currentUserInfo.status}</Typography>
      </div>
      <Button
        sx={{ display: 'block', margin: 'auto', marginTop: '14px' }}
        variant="contained"
        onClick={() => navigate(`/${currentUserInfo._id}`)}
      >
        go
      </Button>
    </div>
  );
};

export default UserNetworkCard;
