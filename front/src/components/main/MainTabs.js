import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import styled2 from 'styled-components';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainFoodTab from './MainFoodTab';
import MainExerciseTab from './MainExerciseTab';

import { Section, SectionTitle } from '../styledCompo/mainStyle';
import { ColorButton } from '../styledCompo/muiCustom';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    // style={{padding: '10px 20px'}}

    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  // backgroundColor: 'red',
  // padding: '0px 20px',
  width: '100%',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  margin: '20px',

  textTransform: 'none',
  marginRight: 0,
  width: '47%',
  height: '20px', 
  maxWidth: '800px',
  '&.Mui-selected': {
    // color: '#fff',
    color: '#F03E3E',
    backgroundColor: '#94D82D',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },

  boxSizing: 'borderBox',

  left: '0%',
  right: '0%',
  top: '0%',
  bottom: '0%',

  backdropFilter: 'blur(40px)',
  /* Note: backdrop-filter has minimal browser support */

  // +++++++++++++++++++++++++++++++++++++++++++++++++
  fontFamily: ['Jost'],
  fontStyle: 'italic',
  fontWeight: 700,
  fontSize: '22px',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
  // backgroundColor: '#94D82D',
  // background: 'linear-gradient(180deg, #A8E054 100%, #99DA36 100%)',
  backgroundColor: '#FCFFF8',
  border: 'solid', 
  borderColor: '#94D82D',
  borderRadius: '20px',
  color: '#F03E3E',
}));

const MainTrackingSection = styled2.div`
position: relative;
  width: 900px;
  margin-right: 80px;
`;

const MainTabsSection = styled2.div`

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

const TabPanel = styled(MainTabPanel)({
  // backgroundColor: '#ECF8D9',
  // 폼만 스크롤
  height: '400px',

  // 스크롤 전범위
  // overflow: 'auto',
  // height: '400px',
  // position: 'relative',
});

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const MainTabs = ({}) => {
  const [value, setValue] = useState(0);
  const [isRerender, setIsRerender] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isRerender) {
      setTimeout(() => {
        setIsRerender(false);
      }, 1);
    }
  }, [isRerender]);

  const clearForm = () => {
    setIsRerender(true);
  };

  return (
    !isRerender && (
      <MainTrackingSection>
        <Section>
          <SectionTitle>Tracking</SectionTitle>
          <MainTabsSection>
            <div>
              <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {['Food', 'Exercise'].map((label, index) => (
                  <StyledTab key={label} label={label} {...a11yProps(index)} />
                ))}
              </StyledTabs>
            </div>
            <TabPanel value={value} index={0}>
              <MainFoodTab clearForm={clearForm} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MainExerciseTab clearForm={clearForm} />
            </TabPanel>
          </MainTabsSection>
        </Section>
      </MainTrackingSection>
    )
    // && scroll()
  );
};

export default MainTabs;
