import styled from 'styled-components';

import TextField from '@mui/material/TextField';

const MainInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: 'red',
      label: 'red',
      value: 'red', 
      // backgroundColor: 'white',
      borderColor: '#4C7115',
      // border: 'white',
      // boxShadow: '0 0 5px 2px #cdcdcd',

    },
    '&:hover fieldset': {
      // borderColor: 'yellow',
      borderColor: '#4C7115',
      color: 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4C7115',
      color: 'red',
    },
  },
});

export default MainInput;
