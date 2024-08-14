import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import {useDispatch} from 'react-redux'
import { addRecord } from '../features/expenseRecordSlice';
import Axios from 'axios';
import {TextField,Select, MenuItem,InputLabel,Button, Typography} from '@mui/material'
import { MdPostAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const FinancialRecordForm = ({marginTop,marginLeft}) => {
  const dispatch = useDispatch();
  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [paymentMethod,setPaymentMethod] = useState("");
  const [isOpen,setIsOpen] = useState(false);
  const handleClose = () =>{
    setIsOpen(false)
  }
  const user = useUser();
  
  const addrecord = async(body) =>{
    const response1 = await Axios.post(`http://localhost:3000/expense-records/`,body)
    dispatch(addRecord({ type: 'ADD_EXPENSE_RECORD', payload: response1.data }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
   
    const newRecord = {
      userId : user?.user.id ?? "",
      date : new Date().toISOString(),
      description : description,
      amount : parseInt(amount),
      category : category,
      paymentMethod : paymentMethod,
    }
    addrecord(newRecord);
    setDescription("")
    setAmount("")
    setCategory("");
    setPaymentMethod("");
  }

  return (
    <div>
    <MdPostAdd onClick={()=>setIsOpen(true)}
      className='size-8 justify-self-center m-10 hover:text-gray-800'
    />
    {
    isOpen && 
    <div className="fixed z-10 top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-50" style={{marginTop:`${marginTop}px`,marginLeft:`${marginLeft}px`}}>
      <div className='bg-white p-2 rounded-md'>
      <div className='flex flex-row items-center justify-between'>
      <Typography variant='h5' color={'#5AB2FF'} fontWeight={600} borderRadius={1} sx={{pl:2}}> Add Record </Typography>
      <IoClose onClick={handleClose} className='size-8'/>
      </div>
      <hr className=' text-gray-600'/>
      <form className='grid grid-cols-1 md:grid-cols-2'>
        <div className="form-field m-4">
          <TextField id='' label='Description' variant='standard' value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="form-field m-4 flex flex-col">
          <TextField id='' label='Amount' variant='standard' value={amount}  onChange={(e) => setAmount(e.target.value)} />
          <div className='flex flex-row justify-start mt-2'>
          <Button sx={{mr:1}} variant='contained' color='success'  onClick={()=>setAmount(Math.abs(amount))} >Earned</Button>
          <Button sx={{ml:1}} variant='contained' color='error' onClick={()=>setAmount(-amount)}>Spent</Button>
          </div>
        </div>
        
        <div className="form-field m-4">
        <InputLabel>Category : </InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{width:'225px'}}
            variant='standard'
          >
            <MenuItem value="">Select a Category</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Freelancing">Freelancing</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </div>
        <div className="form-field m-4">
          <InputLabel>Payment Method:</InputLabel>
          <Select
            value={paymentMethod}
            sx={{width:'225px'}}
            onChange={(e) => setPaymentMethod(e.target.value)}
            variant='standard'
          >
            <MenuItem value="">Select a Payment Method</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          </Select>
        </div>
        <Button variant="contained" onClick={handleSubmit}>Add Record</Button>
      </form>
      </div>
      </div> 
    }
    </div>
  )
}

export default FinancialRecordForm