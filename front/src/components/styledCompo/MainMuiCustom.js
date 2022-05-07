import { styled } from '@mui/material/styles';

import { ColorButton } from './muiCustom';

export const TrackingPlusButton = styled(ColorButton)({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  fontWeight: 800,
  fontSize: '22px',
  minWidth: '0px',
  fontStyle: 'normal',
  marginRight: '30px', 
});

export const TrackingResetButton = styled(ColorButton)({
  width: ' 100%',
  borderRadius: '15px',
  height: '44px',
  fontWeight: 600,
  fontSize: '20px',
});

export const TrackingTrackingButton = styled(ColorButton)({
  width: '21%',
  height: '44px',
  fontWeight: 600,
  fontSize: '20px',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
  // backgroundColor: '#94D82D',
  background: 'linear-gradient(180deg, #F46161 20%, #F14444 50%)',
  //   background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: 'blur(26.67px)',

  borderRadius: '15px',
  color: 'white',
});
