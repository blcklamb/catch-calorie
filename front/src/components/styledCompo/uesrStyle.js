import { styled } from '@mui/material/styles';
import styled2 from 'styled-components';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

//Mui 커스텀 스타일드 컴포넌트
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

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
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
  flex-flow: column;
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
  height: 50px;
  border-radius: 15px;
  // background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 20px;
`;

export const UserAKAInfo = styled2.div`
  width: 400px;
  height: 50px;
  border-radius: 15px;
  // background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const UserBtnInfo = styled2.div`
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

export const CardText = styled2.div`
  width: 1203px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  top: 50px;
  left: 70px;
  z-index:30;
`;
