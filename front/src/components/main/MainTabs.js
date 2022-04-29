import * as React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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
  maxWidth: '800px',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: '#4C7115',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

const MainTabsSection = styled(Box)`
  width: 900px;
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
  kcalPerGram,
  setKcalPerGram,
  kcalPerHour,
  setKcalPerHour,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainTabsSection>
      <div>
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <StyledTab label="Food" {...a11yProps(0)} />
          <StyledTab label="Exercise" {...a11yProps(1)} /> */}
          {['Food', 'Exercise'].map((label, index) => (
            <StyledTab key={label} label={label} {...a11yProps(index)} />
          ))}
        </StyledTabs>
      </div>
      <TabPanel value={value} index={0}>
        <MainFoodTab
          foodSelected={foodSelected}
          setFoodSelected={setFoodSelected}
          totalFood={totalFood}
          setTotalFood={setTotalFood}
          kcalPerGram={kcalPerGram}
          setKcalPerGram={setKcalPerGram}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MainExerciseTab
          exerciseSelected={exerciseSelected}
          setExerciseSelected={setExerciseSelected}
          totalExercise={totalExercise}
          setTotalExercise={setTotalExercise}
          kcalPerHour={kcalPerHour}
          setKcalPerHour={setKcalPerHour}
        />
      </TabPanel>
    </MainTabsSection>
  );
};

export default MainTabs;
