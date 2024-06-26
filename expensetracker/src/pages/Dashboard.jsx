import React, { useEffect, useState } from 'react'
import {useUser} from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { addRecord } from '../features/expenseRecordSlice'
import Navbar from '../components/Navbar'
import { login } from '../features/userSlice'
import Banner from '../components/Banner'
import DashboardTabs from '../components/DashboardTabs'
import Axios from 'axios'
const Dashboard = () => {
  const dispatch = useDispatch(); 
  let user = useUser();
  const [count,setCount] = useState(0);
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
    <div className=' flex flex-col items-center h-screen backgroundImg'>
    <Navbar/>
    { 
      (user.isLoaded && user.isSignedIn )
       ? <DashboardTabs/> 
        : <Banner />
    }
    
    </div> 
  )
}

export default Dashboard
