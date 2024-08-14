import React from 'react'
import { AppBar,Toolbar,IconButton ,Typography} from '@mui/material'
import { UserButton, useUser,SignInButton,SignUpButton,SignedOut,SignedIn } from '@clerk/clerk-react'
const Navbar = () => {
    const {user} = useUser();
    const userButtonAppearance = {
      elements: {
        userButtonAvatarBox: "w-10 h-10", // Custom width and height
        userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
        userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
      },
    };
  return (
    <AppBar position="static" sx={{height:'70px',justifyContent:'center', background:'#5BBCFF'}}>
    <Toolbar variant="dense" sx={{justifyContent:'space-between'}}>
        
      <Typography variant="h6" color="inherit" component="div">
        SpendWise
      </Typography>
      <div className='sign-in-container'>
        <SignedOut>
            <SignUpButton mode='modal' />
            <SignInButton mode='modal' />
        </SignedOut>
        <SignedIn>
            <UserButton appearance={userButtonAppearance}/>
        </SignedIn>
       </div>
      
    </Toolbar>
  </AppBar>
  )
}

export default Navbar