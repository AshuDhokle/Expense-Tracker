import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {selectUser} from '../features/userSlice'
const AddIncome = () => {
    
    const user = useSelector(selectUser);
    const [open,setOpen] = useState(false);
    const [source,setSource] = useState('');
    const [amount,setAmount] = useState();
    const [date,setDate] = useState();
    const addIncome = async(e) =>{
        e.preventDefault();
        try {
            const userId = user._id;
            const response = await axios.post('http://localhost:3000/user-router/addIncome',{amount,source,date,userId})
        } catch (error) {
            console.log(error);
        }finally{
            setSource('')
            setAmount('')
            setDate('')
            setOpen(false)
        }
    }
    
return (
    <div>
        <img src='images/income.png' alt='add-income'
         className='size-12 rounded-full m-2 cursor-pointer hover:bg-gray-200' 
         onClick={()=>setOpen(true)}
        /> 
        {
         open && (
            <div className='fixed z-10 top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-50'>
                <form onSubmit={addIncome} className='flex flex-col bg-white rounded-md p-2'>
                    <IoIosCloseCircleOutline onClick={()=>setOpen(false)}
                     className='size-8 justify-self-end mx-2 mt-1 text-rose-400 hover:text-rose-600'
                    />
                    <TextField label="Income source" variant='standard' sx={{m:2}} value={source} autoComplete='off' onChange={(e)=>setSource(e.target.value)}/>
                    <TextField label="Amount" variant='standard' sx={{m:2}} value={amount} autoComplete='off' onChange={(e)=>setAmount(e.target.value)}/>
                    <TextField label="Date" variant='standard' sx={{m:2}} value={date} autoComplete='off' onChange={(e)=>setDate(e.target.value)}/>    
                    <button type='submit' className='p-2 mb-2 border-2 hover:bg-yellow-500 hover:text-white'>Add Income</button>
                </form>
            </div>
         )
        }
    </div>
  )
}

export default AddIncome