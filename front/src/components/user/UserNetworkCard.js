import React from 'react';
import { useNavigate } from 'react-router-dom';

//Mui

import { NetworkGlass, StatusText, NickText } from '../styledCompo/NetworkCardStyle';
import { ColorButton } from '../styledCompo/muiCustom';

const UserNetworkCard = ({ currentUserInfo }) => {
  const navigate = useNavigate();

  return (
    <NetworkGlass>
      <div>
        <div style={{ paddingTop: 20 }}>
          <img
            src={currentUserInfo.icon}
            alt="badge"
            style={{ width: 80 + '%', display: 'block', margin: 'auto', marginBottom: 10 }}
            onClick={() => navigate(`/${currentUserInfo._id}`)}
          ></img>
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        <NickText>{currentUserInfo.name}</NickText>
        <StatusText>{currentUserInfo.status}</StatusText>
      </div>
      <ColorButton
        variant="contained"
        style={{ width: '40%', height: 40, margin: 20 }}
        onClick={() => navigate(`/${currentUserInfo._id}`)}
      >
        Go
      </ColorButton>
    </NetworkGlass>
  );
};

export default UserNetworkCard;
