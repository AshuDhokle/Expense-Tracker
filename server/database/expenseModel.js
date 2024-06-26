import Mongoose from "mongoose";

const expense = new Mongoose.Schema({
   userId:{
    type:String,
    required:true, 
   },
   date:{
    type:Date,
    required:true,
   },
   description:{
    type:String,
    required:true,
   },
   amount:{
    type:Number,
    required:true,
   },
   category:{
    type:String,
    required:true,
   },
   paymentMethod:{
    type:String,
    required:true,
   }
})

const Expense = Mongoose.model('expense',expense)

export {Expense};