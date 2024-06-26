import React, { useEffect, useState } from 'react'
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField } from '@mui/material'
import { useUser } from '@clerk/clerk-react'
import Axios from 'axios'

const EditSalary = ({isOpen,handleClose}) => {
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
    <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          
        }}
      >
        <DialogContent>
          <DialogContentText>
            Update Salary Details
          </DialogContentText>
          <TextField label="Salary" sx={{m:2}} value={salary} onChange={(e)=>setSalary(e.target.value)}/> 
          <TextField label="Date of Salary" sx={{m:2}} value={dateOfSalary} onChange={(e)=>setDateOfSalary(e.target.value)}/>    
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Cancel</Button>
          <Button type="submit" onClick={handleClick}>Update</Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditSalary