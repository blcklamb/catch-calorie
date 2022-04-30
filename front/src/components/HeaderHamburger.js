import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../atoms';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 400;

const HeaderHamburgerBox = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  flex-direction: inline;
  align-items: center;
  position: absolute;
`;

function Header(props) {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenState);
  const [recoilUser, setRecoilUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    // dispatch({ type: 'LOGOUT' });
    setRecoilUser(null);
    setUserInfo(null);
    setToken(null);

    // 기본 페이지로 돌아감.
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key={'mypage'} onClick={() => navigate('/mypage')}>
          <ListItemText primary={'My Page'} />
        </ListItem>
        <ListItem button key={'editProfile'} onClick={() => navigate('/users')}>
          <ListItemText primary={'Edit Profile'} />
        </ListItem>
        <ListItem button key={'network'} onClick={() => navigate('/network')}>
          <ListItemText primary={'Network'} />
        </ListItem>
        <ListItem button key={'signOut'} onClick={logout}>
          <ListItemText primary={'Sign Out'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'manual'}>
          <ListItemText primary={'Manual'} />
        </ListItem>
        <ListItem button key={'deleteAccout'}>
          <ListItemText primary={'Delete Accout'} />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <HeaderHamburgerBox>
      <IconButton
        style={{ paddingRight: '30px' }}
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        container={container}
        anchor={'right'}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block' },
          // display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        style={{ zIndex: 4000 }}
      >
        {drawer}
      </Drawer>
    </HeaderHamburgerBox>
  );
}

export default Header;
