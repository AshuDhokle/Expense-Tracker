import React, { useEffect, useState } from 'react'
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Divider,TextField } from '@mui/material'
import { useUser } from '@clerk/clerk-react'
import Axios from 'axios'

const IncomeDetails = ({idx,value}) => {
    const user = useUser();
    //console.log(user);
    const [count,setCount] = useState(0);
    const [logedUser,setLogedUser] = useState();
    const [dateOfSalary,setDateOfSalary] = useState();
    const [salary,setSalary] = useState();
  useEffect(()=>{
    const fetchUser = async(user) => {
       const response = await Axios.get(`http://localhost:3000/user-router/${user.user.id}`);
       setLogedUser(response.data);
       setDateOfSalary(response.data.dateOfSalary);
       setSalary(response.data.salary)
    }
    if(user.isLoaded && user.isSignedIn && count<1){
        fetchUser(user);
        setCount(count+1);
    }
  },[user])
  
  const handleClick = async() =>{
    const response = await Axios.patch(`http://localhost:3000/user-router/${user.user.id}`,{salary,dateOfSalary})
  }
  return (
    value === idx &&
    <div className='p-6 flex flex-col'>
      <div className=' flex flex-col'>
      <h1 className='my-2 text-xl font-semibold'>Salary Details</h1>
      <div className='flex flex-row'>
      <TextField label="Salary" sx={{m:2}} value={salary} onChange={(e)=>setSalary(e.target.value)}/> 
      <TextField label="Date of Salary" sx={{m:2}} value={dateOfSalary} onChange={(e)=>setDateOfSalary(e.target.value)}/>
      </div>
      <Button type="submit" onClick={handleClick} 
       sx={{alignSelf:'start'}}
      >
        Update
      </Button>
      <Divider/>
      <img src='images/income.png' alt='add-income' className='size-12 rounded-full m-2 cursor-pointer hover:bg-gray-200' />
      </div>
    </div>
  )
}

export default IncomeDetails
