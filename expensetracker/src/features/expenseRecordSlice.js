import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   expenseRecord : [],
}


export const expenseRecordSlice = createSlice({
    name:'expenseRecord',
    initialState,
    reducers:{
        addRecord:(state,action)=>{
           const body = action.payload.payload;
           let newExpenseRecordArray = state.expenseRecord;
           if(body.constructor === Array){
            body.map((ele)=>{
                newExpenseRecordArray = [...newExpenseRecordArray,ele];    
            })
           }else{
            newExpenseRecordArray = [...newExpenseRecordArray,body];
           }
           
           state.expenseRecord = newExpenseRecordArray;
           
        },

        deleteRecord:(state,action)=>{
           const body = action.payload.payload;
           let newExpenseRecordArray = state.expenseRecord;
           
           newExpenseRecordArray = newExpenseRecordArray.filter((item)=>( item._id != body))
           state.expenseRecord = newExpenseRecordArray;
        }
    }
})

export const {addRecord,deleteRecord} = expenseRecordSlice.actions;

export const selectExpense = (state) => state.expenseRecord.expenseRecord;

export default expenseRecordSlice.reducer;