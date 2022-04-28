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
