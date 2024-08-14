import React, { useEffect, useState } from 'react'
import {useUser} from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { addRecord } from '../../features/expenseRecordSlice'
import Navbar from '../../components/Navbar'
import { login } from '../../features/userSlice'
import Banner from '../../components/Banner'
import DashboardTabs from './DashboardTabs'
import Axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
;import { Tab, Tabs } from '@mui/material'
<TailSpin
  height="80"
  width="80"
  radius="9"
  color="red"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
const Dashboard = () => {
  const dispatch = useDispatch(); 
  let user = useUser();
  const [count,setCount] = useState(0);
  const [index,setIndex] = useState(0);
    const changeIndex = (e,newValue) =>{
      setIndex(newValue)
    }
  useEffect(()=>{
    const fetchRecords = async()=>{
      if(user.isLoaded && user.isSignedIn && count == 0){
        const response = await Axios.get(`http://localhost:3000/expense-records/getAllByUserID/${user.user.id}`);
        dispatch(addRecord({ type: 'ADD_EXPENSE_RECORD', payload: response.data }));
        setCount(count+1);
      }
    }
    const fetchUser = async() =>{
      if(user.isLoaded && user.isSignedIn){
        const response = await Axios.get(`http://localhost:3000/user-router/${user.user.id}`);
        dispatch(login(response.data));
      }
    }
    fetchUser();
    fetchRecords();
  },[user])
  
  
  
  return (
    <div>
    <Navbar/>
    <div className=' flex flex-col items-center backgroundImg'>
    
    { 
      user.isLoaded ?
      (
        user.isSignedIn?  
        <DashboardTabs/>
        :
        <Banner />
      ) 
      : <TailSpin />
    }
    
    </div>
    </div> 
  )
}

export default Dashboard
