import React, {useState } from 'react'
import { useSelector } from 'react-redux'
import { selectExpense } from '../features/expenseRecordSlice'
import {Box,Typography,Pagination, Divider} from '@mui/material'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteRecord } from '../features/expenseRecordSlice';
import { DeleteRecord } from './DeleteExpense';

import Axios from 'axios';
import { formatDate } from '../utils/formatDate';
import FinancialRecordForm from './financialRecordForm';
const FinancialRecordList = ({idx,value}) => {
  const dispatch = useDispatch();
  const expenseRecordList = useSelector(selectExpense);
  const [expenseRecordsPerPage,setExpenseRecordPerPage] = useState(5);
  const [currentPage,setCurrentPage] = useState(1);
  
  const [isOpen,setisOpen] = useState(false);
  const handleClose=()=>{
    setisOpen(false);
  }

  const paginate = (e,value) =>{
    setCurrentPage(value);
  }

  const indexOfLastRecord = currentPage * expenseRecordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - expenseRecordsPerPage;

  const currentRecord = expenseRecordList.slice(indexOfFirstRecord,indexOfLastRecord);
 
  const handleDelete = async(_id) => {
    dispatch(deleteRecord({type:'DELETE_RECORD',payload:_id}));
    const response = await Axios.delete(`http://localhost:3000/expense-records/${_id}`);
    setisOpen(false)
   
  }

  return (
    value === idx && 
    <Box sx={{ p:'10px',width:'100%',m:'10px'}}>
       <Typography variant='h5' color={'#5AB2FF'} borderRadius={1} sx={{pl:2}} fontWeight={600} >Records</Typography>
       
       <hr className=' text-gray-600'/>
       <div className='m-2 p-2 grid grid-cols-2 lg:grid-cols-4'>
        {
          expenseRecordList.map((item,idx)=>(
            <div key={idx} className='m-2 p-2 bg-white rounded-md shadow-sm'>
              <div className='flex flex-row items-center '>
              <h1 className='mr-2 text-xl font-sans font-semibold'>{item.description}</h1>
              <h1 className='mt-1 text-sm'>{item.category}</h1>
              </div>
              <h1 className='mt-1 text-sm'>{formatDate(item.date)}</h1>
              <Divider sx={{my:1}}/>
              <div className='flex flex-row items-center justify-between'>
              <h1><span className='font-semibold'>Amount : </span> <span className={`${item.amount < 0 ? 'text-red-500':'text-green-500'}`}>{item.amount}</span></h1>
              <h1>{item.paymentMethod}</h1>
              </div>
              <Divider sx={{my:1}}/>
              <div className='my-2'>
                <MdDeleteOutline className='size-6' onClick={()=>setisOpen(true)}/>
                <DeleteRecord id={item._id} trig={isOpen} deleteHandler={handleDelete} resetTrig={handleClose}/>
              </div>
            </div>
          )) 
        }
        <FinancialRecordForm/>
       </div>
       <Pagination color='primary'
        shape='rounded'
        defaultPage={1}
        count={Math.ceil(expenseRecordList.length/expenseRecordsPerPage)}
        page={currentPage}
        onChange={paginate}
        size='large' 
        sx={{my:'10px', position:'relaive', bottom:'0px' }}
      />
    </Box>
  )
}

export default FinancialRecordList



