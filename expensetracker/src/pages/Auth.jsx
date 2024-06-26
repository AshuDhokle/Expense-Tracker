import React from 'react'
import {SignedIn,SignedOut,SignUpButton,SignInButton,UserButton, SignUp} from '@clerk/clerk-react'
const Auth = () => {
  
  return (
    <div className='sign-in-container'>
        <SignedOut>
            <SignUpButton mode='modal' />
            <SignInButton mode='modal' />
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
    </div>
  )
}

export default Auth