import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import EditSalary from './EditSalary';
import FinancialRecordList from './financialRecordList';
import FinancialRecordForm from './financialRecordForm';
import Analysis from './Analysis';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const DashboardTabs = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(!isSmallScreen)
    setValue(0);
  },[isSmallScreen])
  return (
        <div className='w-full px-10'>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              alignSelf: 'end',
              m: 2,
              color: '#686D76',
              border: 2,
              fontWeight: 700,
              '&:hover': {
                border: 2,
                boxShadow: '0 0 5px #5AB2FF, 0 0 5px #5AB2FF',
                transform: 'scale(1.0)',
              },
              transition: 'transform 0.3s',
            }}
          >
            Edit Salary Details
          </Button>
          <EditSalary isOpen={open} handleClose={handleClose} />
          {isMediumScreen || isSmallScreen ? (
            <div className='flex flex-col items-center justify-center'>
              <Tabs value={value} onChange={handleTabChange} centered sx={{ p:'2px',width:500}} textColor="primary" indicatorColor="secondary">
                <Tab label="Record List" />
                <Tab label="Record Form" />
                <Tab label="Analysis" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <FinancialRecordList />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <FinancialRecordForm />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Analysis />
              </TabPanel>
            </div>
          ) : (
            <div className='grid grid-cols-2'>
              <FinancialRecordForm marginTop={90} marginLeft={80} />
              <div className='flex flex-col items-center justify-center'>
                <Tabs value={value} onChange={handleTabChange} centered sx={{ p:'2px',width:500}} textColor="primary" indicatorColor="secondary">
                <Tab label="Record List"  sx={{color:'#00215E'}}/>
                <Tab label="Analysis" sx={{color:'#00215E'}}/>
              </Tabs>
              <TabPanel value={value} index={0}>
                <FinancialRecordList />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Analysis />
              </TabPanel>
              </div>
            </div>
          )}
        </div>

  );
};

export default DashboardTabs;
