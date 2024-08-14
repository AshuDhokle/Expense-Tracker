import { createSlice } from "@reduxjs/toolkit";
import {useUser} from '@clerk/clerk-react'
const initialState = {
    user:{},
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state,action)=>{
            state.user = NULL;
        }
    }
})

export const {login,logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;

