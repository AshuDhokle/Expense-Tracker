import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import {useDispatch} from 'react-redux'
import { addRecord } from '../features/expenseRecordSlice';
import Axios from 'axios';
import {TextField,Select, MenuItem,InputLabel,Button, Typography} from '@mui/material'

const financialRecordForm = ({marginTop,marginLeft}) => {
  const dispatch = useDispatch();
  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [paymentMethod,setPaymentMethod] = useState("");
  
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
    <div className="form-container bg-white p-4 rounded-2xl shadow-2xl h-max w-fit my-5" style={{marginTop:`${marginTop}px`,marginLeft:`${marginLeft}px`}}>
      <Typography variant='h5' color={'#5AB2FF'} fontWeight={600} borderRadius={1} sx={{background:'#686D76',pl:2}}> Add Record </Typography>
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
  )
}

export default financialRecordForm