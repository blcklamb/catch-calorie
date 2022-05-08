import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserDelForm from './user/UserDelForm';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../atoms';

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

  const [mobileOpen, setMobileOpen] = useState(false);

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

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
        <ListItem
          button
          key={'tracking'}
          onClick={() => navigate(`/tracking/${userInfo._id}`, { replace: false })}
        >
          <ListItemText primary={'Tracking Page'} />
        </ListItem>
        <ListItem button key={'mypage'} onClick={() => navigate('/mypage', { replace: false })}>
          <ListItemText primary={'My Page'} />
        </ListItem>
        <ListItem button key={'network'} onClick={() => navigate('/network', { replace: false })}>
          <ListItemText primary={'Network'} />
        </ListItem>
        {/* <ListItem button key={('manual', { replace: false })}>
          <ListItemText primary={'How to use'} />
        </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem button key={'signOut'} onClick={logout}>
          <ListItemText primary={'Log-Out'} />
        </ListItem>
        <UserDelForm />
      </List>
    </div>
  );

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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        style={{ zIndex: 100000 }}
      >
        {drawer}
      </Drawer>
    </HeaderHamburgerBox>
  );
}

export default Header;
