import React, {useState } from 'react'
import { useSelector } from 'react-redux'
import { selectExpense } from '../features/expenseRecordSlice'
import {List,Accordion,ListItem, Box, AccordionSummary,AccordionDetails, Typography,Pagination} from '@mui/material'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteRecord } from '../features/expenseRecordSlice';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Axios from 'axios';
import { useUser } from '@clerk/clerk-react';
const FinancialRecordList = () => {
  const dispatch = useDispatch();

  const expenseRecordList = useSelector(selectExpense);
  //const user = useUser();
  const [expenseRecordsPerPage,setExpenseRecordPerPage] = useState(3);
  const [currentPage,setCurrentPage] = useState(1);
  
  const [isOpen,setisOpen] = useState(false);
  const [deleteId,setDeleteId] = useState();
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
    //console.log(response);
  }

  return (
    <Box sx={{ p:'10px', my:'10px',width:'450px',justifyContent:'center',background:'white' , height:'fit', borderRadius:5}} boxShadow={10}>
       <Typography variant='h5' color={'#5AB2FF'} borderRadius={1} sx={{pl:2}} fontWeight={600} >Records</Typography>
       <hr className=' text-gray-600'/>
       <List  sx={{background:''}}>
       {
        currentRecord.map((item,idx)=>( 
            <ListItem key={idx}>
              <Accordion sx={{width:'400px'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}  aria-controls="panel1-content">
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'300px'}}>
                <Typography sx={{fontSize:15,fontWeight:550, color:'#3C5B6F'}} >
                  {item.category}
                </Typography>
                <Typography sx={{fontWeight:800, fontFamily:'cursive',}} color={item.amount>=0?'#03AED2':'#FF7F3E'}>
                 {item.amount}
                </Typography >
                </Box> 
                </AccordionSummary>
                
                <AccordionDetails sx={{ fontSize:'15px', fontWeight:'400', display:'flex',justifyContent:'space-between',color:'#577B8D'}}>
                 <span> {item.description} </span> <span className='self-end text-slate-500'>{item.date.slice(0,10)}</span>
                </AccordionDetails>
              </Accordion>
              <MdDeleteOutline className='size-8 text-red-500' onClick={()=>{setisOpen(true); setDeleteId(item._id)}}/>
              {isOpen && deleteId===item._id && <DeleteRecord trig={isOpen} resetTrig={handleClose} deleteHandler={handleDelete} id={item._id}/>}
              
            </ListItem>
            
        ))
        
       }
       </List>
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


const DeleteRecord = (props) => {
  console.log(props.id); 
  return (
    props.trig ? (
      <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-4">
          <h1 className="text-xl font-bold mb-4">Confirm!</h1>
          <p className="text-gray-700 mb-4">Are you sure you want to delete this item?</p>
          <div className="flex justify-end">
            <button onClick={() => props.deleteHandler(props.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
            <button onClick={() => props.resetTrig()} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">No</button>
          </div>
        </div>
      </div>
    ) : null
  );
}

