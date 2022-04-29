import React, { useState } from 'react';
import styled from 'styled-components';
import avocado from '../image/avocado.gif';
// import { UserStateContext } from '../App';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../atoms';

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

const Container = styled.div`
  position: fixed;
  height: 100px;
  width: 100vw;
  background-color: #9fdc42;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3000;
  top: 0;
`;

const Logo = styled.h3`
  font-size: 2.9rem;
  color: #f03e3e;
  font-style: bold;
  margin: 15px 30px -5px;
`;

const LogoCopy = styled.div`
  font-size: 1rem;
  color: white;
  font-style: bold;
  margin-left: 35px;
  margin-bottom: 10px;
`;

const Avocadobox = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  flex-direction: inline;
  align-items: center;
  position: absolute;
`;
const Avocado = styled.img`
  width: 100px;
  height: 100px;
  margin: 15px;
`;

const drawerWidth = 240;

function Header(props) {
  const [user, setUser] = useRecoilState(userInfoState);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Container>
        <Logo>Catch Carlories</Logo>
        <LogoCopy>health tracker</LogoCopy>
        {user ? (
          // <></>
          <>
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
            <Box component="nav" sx={{ width: { sm: drawerWidth } }} aria-label="mailbox folders">
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
            </Box>
          </>
        ) : (
          <Avocadobox>
            <Avocado src={avocado} />
          </Avocadobox>
        )}
      </Container>
    </>
  );
}

export default Header;
