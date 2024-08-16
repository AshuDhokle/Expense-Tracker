import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { Button, Typography } from '@mui/material';
import { selectExpense } from '../features/expenseRecordSlice';
import { useUser } from '@clerk/clerk-react';
import Dougunut from './Dogunut';
import Dougunut2 from './Dougnut2';
import BarChart from './BarChart'
import {ChartColors} from '../utils/chartColor'
const Analysis = ({idx,value}) => {
  const { isLoaded, isSignedIn } = useUser();
  const records = useSelector(selectExpense)
  const [totalEarned,setTotalEarned] = useState(0);
  const [totalSpent,setTotalSpent] = useState(0);
  const [count,setCount] = useState(0);
  const [Data,setData] = useState({});
  const [earnedData,setEarnedData] = useState({});
  const [spentData,setSpentData] = useState({});
  const [isTotalOpen,setIsTotalOpen] = useState(true);
  const [isEarnedOpen,setIsEarnedOpen] = useState(false);
  const [isSpentOpen,setIsSpentOpen] = useState(false);
  useEffect(()=>{
    if (records.length > 0 && isLoaded && isSignedIn) {
      let earned = 0;
      let spent = 0;
      let earnedMap = {};
      let spentMap = {};
      records.forEach(record => {
        if (record.amount >= 0) {
          earned += record.amount;
          const category = record.category;
          if(earnedMap[category] === undefined){
            earnedMap[category] = record.amount;
          }else{
            earnedMap[category] += record.amount;
          }
        } else {
          spent += Math.abs(record.amount);
          const category = record.category;
          if(spentMap[category] === undefined){
            spentMap[category] = Math.abs(record.amount)
          }else{
            spentMap[category] += Math.abs(record.amount);
          }
        }
      });
      setTotalEarned(earned);
      setTotalSpent(spent);
      setData({...Data,'Earned':earned,'Spent':spent})
      
      let temp = earnedMap;
      setEarnedData({...earnedData,temp});
      temp = spentMap;
      setSpentData({...spentData,temp});
      setCount(count + 1);
    }
  },[records])
  return (
    idx === value && 
    <div className='bg-white p-4 w-full h-full'>
      <Typography variant='h5' color={'#5AB2FF'} fontWeight={600} sx={{}} borderRadius={1}>Analysis</Typography>
      <h1  >Earned: {totalEarned}/- </h1>
      <h1  >Spent: {totalSpent}/- </h1>
      <h1  >Remaining: {totalEarned-totalSpent}/- </h1>
      <hr className=' text-gray-600'/>
      <div className='flex flex-col items-center justify-center'>
      <div className='my-5'>
      <Button sx={{m:1}} variant='contained' color='success' onClick={()=>{setIsTotalOpen(true); setIsEarnedOpen(false); setIsSpentOpen(false)}}>Total</Button>
      <Button sx={{m:1}} variant='contained'  onClick={()=>{setIsTotalOpen(false); setIsEarnedOpen(true); setIsSpentOpen(false)}}>Earned</Button>
      <Button sx={{m:1}} variant='contained' color='error' onClick={()=>{setIsTotalOpen(false); setIsEarnedOpen(false); setIsSpentOpen(true)}}>Spent</Button>
      </div>
      <div>
      <div className=''>
      {isTotalOpen && <Dougunut Data={Data} Categories={['Earned','Spent']} colors={['rgba(0, 217, 255, 0.8)','rgba(255, 53, 34, 0.8)']}/> }
      {isEarnedOpen &&  <BarChart Data={earnedData.temp} colors={ChartColors} />}
      {isSpentOpen &&  <BarChart Data={spentData.temp} colors={ChartColors}/>}
      </div>
      </div>
      </div>
    </div>
  )
}

export default Analysis