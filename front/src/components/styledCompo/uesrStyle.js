import { styled } from '@mui/material/styles';
import styled2 from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#94D82D',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: '#699C1D',
    borderWidth: 2,
  },
  '& input:disabled + fieldset': {
    borderColor: '#699C1D',
    borderWidth: 2,
  },
  '& input ': {
    borderColor: '#699C1D',
    borderWidth: 2,
  },
  // '& input:valid:focus + fieldset': {
  // 	borderColor: '#699C1D',
  // 	borderLeftWidth: 6,
  // 	padding: '4px !important', // override inline-style
  // },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: '#9CFD08',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#94D82D'),

  boxShadow: '0px 2px 2px #86C725',
  backgroundColor: '#94D82D',
  color: '#F03E3E',
  '&:hover': {
    backgroundColor: '#94D82D',
    boxShadow: '0px 2px 3px #699C1D',
  },

  '& + &': {
    marginLeft: '30px',
  },
}));

export const ColorButtonB = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#94D82D'),
  borderColor: '#94D82D',
  color: '#F03E3E',
  '&:hover': {
    // boxShadow: '0px 2px 3px #699C1D',
    backgroundColor: '#FCFFF8',
    borderColor: '#699C1D',
  },
}));

// UserCard에서 사용하는 스타일드 컴포넌트

export const BadgesContainer = styled2.div`
  margin-top: 180px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const UserContainer = styled2.div`
  width: 1203px;
  height: 700px;
  border-radius: 15px;
  // background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserCardFrame = styled2.div`
  width: 500px;
  height: 600px;
  border-radius: 15px;
  background-color: #ecf8d9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  & + & {
    margin-left: 80px;
  }
`;

export const UserBodyInfo = styled2.div`
  width: 400px;
  height: 100px;
  border-radius: 15px;
  // background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const UserBadgeImgInfo = styled2.div`
  width: 400px;
  height: 300px;
  border-radius: 15px;
  // background-color: #ec4849;
  display: flex;
  justify-content: center;
  align-items: center;
`;
