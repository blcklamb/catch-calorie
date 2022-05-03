import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenState, userInfoState, userState } from '../../atoms';
import * as Api from '../../api';
import { useNavigate } from 'react-router';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserDelForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const navigate = useNavigate();

  const [delMessage, setDelMessage] = React.useState('');
  // console.log(delMessage);

  const handleDel = async (e) => {
    e.preventDefault();

    if (delMessage !== 'I will delete the account.') {
      alert('Please fill it out properly!');
      return;
    }
    try {
      const res = await Api.delete('users', user.id);
      console.log(res);
      setDelMessage('');
      setUser(null);
      setToken(null);
      setUserInfo(null);
      setOpen(false);
      alert('Your account has been deleted successfully.');
      navigate('/');
    } catch (err) {
      console.log('삭제에 실패했군요 휴먼', err);
    }
  };

  return (
    <div>
      <ListItem button key={'deleteAccout'} onClick={handleOpen}>
        <ListItemText>Delete my account</ListItemText>
      </ListItem>
      <Modal
        style={{ zIndex: 4000 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            ⚠️&nbsp;&nbsp;&nbsp;Do you really want to delete your account?&nbsp;&nbsp;⚠️
          </Typography>
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            If so, you should follow to write down this sentence below.
          </Typography>
          <Typography sx={{ mt: 2, color: '#F03E3E' }}>I will delete the account.</Typography>
          <TextField
            sx={{ mt: 2, width: 500 }}
            placeholder="I will delete the account."
            onChange={(e) => setDelMessage(e.target.value)}
          ></TextField>
          <br></br>
          <Button sx={{ mt: 2 }} variant="contained" onClick={handleDel}>
            확인
          </Button>
          <Button sx={{ mt: 2, ml: 1 }} variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
