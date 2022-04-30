import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
// import { UserStateContext } from '../App';
import { useRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../atoms';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const HeaderHamburgerBox = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  flex-direction: inline;
  align-items: center;
  position: absolute;
`;
// const Avocado = styled.img`
//   width: 100px;
//   height: 100px;
//   margin: 15px;
// `;

function Header(props) {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userInfoState);
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
        <ListItem button key={'network'}>
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
      {/* <Toolbar> */}
      {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box> */}
      {/* <AppBar
              position="fixed"
              sx={{
                width: '100%',
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar> */}
      <IconButton
        style={{ paddingRight: '30px' }}
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
        // sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      {/* <Typography variant="h6" noWrap component="div">
                  Responsive drawer
                </Typography>
              </Toolbar>
            </AppBar> */}
      {/* <Box component="nav" sx={{ width: { sm: drawerWidth } }} aria-label="mailbox folders"> */}
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block' },
          // display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                {drawer}
              </Drawer> */}
      {/* </Box> */}
    </HeaderHamburgerBox>
  );
}

export default Header;
