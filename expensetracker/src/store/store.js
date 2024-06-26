import {configureStore} from '@reduxjs/toolkit'
import expenseReducer from '../features/expenseRecordSlice';
import userReducer from '../features/userSlice';
const store = configureStore({
    reducer:{
       expenseRecord : expenseReducer,
       user:userReducer,
    },
})

export default store;