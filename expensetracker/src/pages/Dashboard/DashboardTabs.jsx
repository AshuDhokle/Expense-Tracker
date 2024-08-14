import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import FinancialRecordList from '../../components/financialRecordList';
import FinancialRecordForm from '../../components/financialRecordForm';
import Analysis from '../../components/Analysis';
import IncomeDetails from '../../components/EditSalary';

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [index,setIndex] = useState(0);
  const changeIndex = (e,newValue) =>{
    setIndex(newValue)
  }
  
  return (
    <div className='w-full flex flex-row' style={{height:"710px"}}>
      <Tabs
        orientation="vertical"
        value={index}
        onChange={changeIndex}
        sx={{ backgroundColor:'#26355D', width:'200px',height:'100%' }}
      >
        <Tab label='Expenses' sx={{color:'white'}}/>
        <Tab label='Income' sx={{color:'white'}} />
        <Tab label='Bills' sx={{color:'white'}} />
        <Tab label='Analysis' sx={{color:'white'}} />
        
      </Tabs> 
      <div className='w-full flex flex-col items-center '>
      <FinancialRecordList idx = {index} value={0}/>
      <IncomeDetails idx ={index} value={1}/>
      <Analysis idx={index} value={3} />
      </div> 
    </div>
  );
};

export default DashboardTabs;


const temp = () =>{
  return(
    <>
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
    </>
  )
}
