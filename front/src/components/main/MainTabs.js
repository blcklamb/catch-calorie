import * as React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// import styled from 'styled-components';

import MainFoodTab from './MainFoodTab';
import MainExerciseTab from './MainExerciseTab';

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  width: '100%',
    '& .MuiTabs-indicator': {
      display: 'none',
      // justifyContent: 'center',
      // backgroundColor: 'transparent',
    },
    // '& .MuiTabs-indicatorSpan': {
    //   maxWidth: 40,
    //   width: '100%',
    //   backgroundColor: '#635ee7',
    // },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: 0,
  color: 'white',
  backgroundColor: '#8CB352',
  width: '50%',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: '#4C7115',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

// const StyledTab = styled.Tab`
//   textTransform: 'none',
//   fontWeight: theme.typography.fontWeightRegular,
//   fontSize: theme.typography.pxToRem(15),
//   marginRight: theme.spacing(1),
//   color: 'white',
//   backgroundColor: '#8CB352',
//   '&.Mui-selected': {
//     color: '#fff',
// 	backgroundColor: '#4C7115',
//   },
//   '&.Mui-focusVisible': {
//     backgroundColor: 'rgba(100, 95, 228, 0.32)',
//   },
// `

// +++++++++++++++++++++++++++++++++++++++++++++++++

// const MainTabsSection = styled.div`
//   width: 100%;
//   margin-right: 200px;
// `;

// ++++++++++++++++++++++++++++

const MainTabsSection = styled(Box)`
  width: 700px;
  margin-right: 120px;
`;

const MainTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

MainTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// !!!!!!!!!!!!!!!
const TabPanel = styled(MainTabPanel)({
  height: 300,
  backgroundColor: '#ECF8D9',
  padding: '40px 30px',
});

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const MainTabs = ({
  foodSelected,
  setFoodSelected,
  totalFood,
  setTotalFood,
  exerciseSelected,
  setExerciseSelected,
  totalExercise,
  setTotalExercise,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainTabsSection>
      <div>
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="Food" {...a11yProps(0)} />
          <StyledTab label="Exercise" {...a11yProps(1)} />
        </StyledTabs>
      </div>
      {/* <div> */}
        <TabPanel value={value} index={0}>
          <MainFoodTab
            foodSelected={foodSelected}
            setFoodSelected={setFoodSelected}
            totalFood={totalFood}
            setTotalFood={setTotalFood}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MainExerciseTab
            exerciseSelected={exerciseSelected}
            setExerciseSelected={setExerciseSelected}
            totalExercise={totalExercise}
            setTotalExercise={setTotalExercise}
          />
        </TabPanel>
      {/* </div> */}
    </MainTabsSection>
  );
};

export default MainTabs;
