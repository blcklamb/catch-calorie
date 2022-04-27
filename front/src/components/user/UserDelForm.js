import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MainButton from '../main/style/MainButton';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '../../atoms';
import * as Api from '../../api';

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useRecoilState(userState);
  // const [delUser, setDelUser] = React.useState('user');
  const [delMessage, setDelMessage] = React.useState('');
  console.log(delMessage);

  const handleDel = async (e) => {
    e.preventDefault();

    if (delMessage != '계정을 삭제하겠습니다.') {
    }
    try {
      const res = await Api.delete('users', user.id);
      console.log(res);
    } catch (err) {
      console.log('삭제에 실패했군요 휴먼', err);
    }
  };

  return (
    <div>
      <MainButton
        style={{ marginBottom: '20px', width: '60%', color: '#fff' }}
        onClick={handleOpen}
      >
        Delete my account
      </MainButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Do you really want to delete your account?
          </Typography>
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            If so, you should follow to write down this sentence below.
          </Typography>
          <Typography sx={{ mt: 2 }}>계정을 삭제하겠습니다.</Typography>
          <TextField
            sx={{ mt: 2, width: 500 }}
            placeholder="계정을 삭제하겠습니다."
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
