import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { Button, Typography } from '@mui/material';
import { selectExpense } from '../features/expenseRecordSlice';
import { useUser } from '@clerk/clerk-react';
import Dougunut from './Dogunut';
import Dougunut2 from './Dougnut2';
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
    <div className='bg-white shadow-2xl rounded-2xl p-4 w-fit h-max'>
      <Typography variant='h5' color={'#5AB2FF'} fontWeight={600} sx={{}} borderRadius={1}>Analysis</Typography>
      <hr className=' text-gray-600'/>
      <div className='flex flex-col'>
      <Button sx={{width:'fit',color:'green', fontSize:15, justifyContent:'flex-start'}} >Earned: {totalEarned}/- </Button>
      <Button sx={{width:'fit',color:'red', fontSize:15, justifyContent:'flex-start'}} >Spent: {totalSpent}/- </Button>
      <Button sx={{width:'fit',color:'#615EFC', fontSize:15, justifyContent:'flex-start'}} >Remaining: {totalEarned-totalSpent}/- </Button>
      </div>
      <Button sx={{m:1}} variant='contained' color='success' onClick={()=>{setIsTotalOpen(true); setIsEarnedOpen(false); setIsSpentOpen(false)}}>Total</Button>
      <Button sx={{m:1}} variant='contained'  onClick={()=>{setIsTotalOpen(false); setIsEarnedOpen(true); setIsSpentOpen(false)}}>Earned</Button>
      <Button sx={{m:1}} variant='contained' color='error' onClick={()=>{setIsTotalOpen(false); setIsEarnedOpen(false); setIsSpentOpen(true)}}>Spent</Button>
      <div>
      <div className=''>
      {isTotalOpen && <Dougunut Data={Data} Categories={['Earned','Spent']} colors={['rgba(0, 217, 255, 0.8)','rgba(255, 53, 34, 0.8)']}/> }
      {isEarnedOpen &&  <Dougunut2 Data={earnedData.temp} colors={[
  'rgba(255, 178, 34, 0.8)',
  'rgba(255, 83, 205, 0.8)',
  'rgba(255, 255, 0, 0.8)',
  'rgba(84, 206, 125, 0.8)',
  'rgba(255, 0, 251, 0.49)',
  'rgba(62, 222, 87, 0.9)',
  'rgba(30, 188, 248, 1.0)'
]} />}
      {isSpentOpen &&  <Dougunut2 Data={spentData.temp} colors={[
   'rgba(255, 178, 34, 0.8)',
   'rgba(255, 83, 205, 0.8)',
   'rgba(255, 255, 0, 0.8)',
   'rgba(84, 206, 125, 0.8)',
   'rgba(255, 0, 251, 0.49)',
   'rgba(62, 222, 87, 0.9)',
   'rgba(30, 188, 248, 1.0)'
]}/>}
</div>
      </div>
    </div>
  )
}

export default Analysis