import { styled } from '@mui/material/styles';

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
  textTransform: 'none',
  width: '50%',
  height: '50px',
  fontFamily: ['Jost'],
  fontStyle: 'italic',
  fontWeight: 800,
  fontSize: '26px',
  borderRadius: '20px',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
  // backgroundColor: '#94D82D',
  background: 'linear-gradient(180deg, #A8E054 100%, #99DA36 100%)',
  color: '#F03E3E',

  //borderImage: 'linear-gradient(to right, red 0%, orange 100%)',

  // border: '1px solid black',

  '&:hover': {
    backgroundColor: '#94D82D',
  },

  '& + &': {
    marginLeft: '30px',
  },
}));

export const ColorButtonB = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#94D82D'),
  textTransform: 'none',
  width: '50%',
  height: '50px',
  fontFamily: ['Jost'],
  fontStyle: 'italic',
  fontWeight: 800,
  fontSize: '26px',
  borderColor: '#94D82D',
  borderRadius: '20px',

  color: '#F03E3E',
  '&:hover': {
    // boxShadow: '0px 2px 3px #699C1D',
    backgroundColor: '#FCFFF8',
    borderColor: '#699C1D',
  },
}));

export const SmallButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#94D82D'),
  textTransform: 'none',
  width: '50%',
  fontFamily: ['Jost'],
  fontStyle: 'italic',
  fontWeight: 800,
  fontSize: '14px',
  borderRadius: '14px',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
  // backgroundColor: '#94D82D',
  background: 'linear-gradient(180deg, #A8E054 100%, #99DA36 100%)',
  color: '#F03E3E',
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
