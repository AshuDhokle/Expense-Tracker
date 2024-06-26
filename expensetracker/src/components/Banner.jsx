import { Button, Link, Typography } from '@mui/material'
import React from 'react'
import BannerImg from '/images/banner3.png'
import { useNavigate } from "react-router-dom";
import { SignInButton,SignUpButton } from '@clerk/clerk-react';
const Banner = () => {
    const navigate = useNavigate();
    const handleClick = () => {
       navigate('/auth');
    } 
    return (
    <div className='bannerBg m-10 p-10 flex flex-row self-center justify-evenly shadow-2xl w-100 bg-gradient-to-tl from-white from-30% to-blue-500 to-20% rounded-2xl'>
        <div className='w-fit'>
        <Typography fontWeight={700} sx={{color:'#FFF455', fontSize:{lg:'35px', xs:'25px'}}}>
            SPEND-WISE
        </Typography>
        <Typography variant='h5' mt={5} fontWeight={600} color={"#01204E"} sx={{fontSize:{lg:'30px', xs:'20px'}}}>
            Simplify Your Finances
        </Typography>
        <Typography mt={2} fontWeight={600} color={'white'} fontFamily={"cursive"} variant='h6' lineHeight={1.5} sx={{fontSize:{lg:'20px', xs:'15px'}}} >
            Stay on top of your spending <br/> and manage your money smarter. <br/> Our expense tracker makes budgeting <br/> and saving simple and intuitive.
        </Typography>
        </div>
        <div className='flex flex-col items-center'>
            <img src={BannerImg} className='size-60 md:size-72 lg:size-96 invisible md:visible'/>
            <div className=''>
            <SignInButton mode='modal' className='m-2 bg-red-500 hover:bg-red-600 p-2 rounded-xl text-white'/>
            <SignUpButton mode='modal' className='m-2 bg-red-500 hover:bg-red-600 p-2 rounded-xl text-white'/>
            </div>
        </div>
    </div>
  )
}

export default Banner