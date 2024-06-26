import Mongoose from 'mongoose';
import { Expense } from './expenseModel.js';
const user = Mongoose.Schema({
    userDetails : {
        type:Object,
        required:true
    },
    salary:{
        type:Number,
        default:0,
    },
    dateOfSalary:{
        type:Number,
        default:1, 
    },
    
    userId:{
        type:String,
        required:true,
    },
    money:{
        type:Number,
        default:0,
    }
})

const User = Mongoose.model('user',user);

export {User};