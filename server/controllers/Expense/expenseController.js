import { Expense } from "../../database/expenseModel.js";

export const getAllExpensesByUser = async (req,res)=>{
    try {
     const userId = req.params.userId;
     const records = await Expense.find({userId:userId});
     
     if(records.length === 0){
         return res.status(404).send('No records found for the user');
     }
     return res.status(200).send(records);
    } catch (error) {
     return res.status(500).send(error);
    }   
}

export const addExpense = async (req,res)=>{
    try {
        const newRecordBody = req.body;
        const newRecord = await Expense(newRecordBody);
        const savedRecord = await newRecord.save();
        if(savedRecord){
            return res.status(200).send(savedRecord);
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateExpense = async(req,res)=>{
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await Expense.findByIdAndUpdate(id,newRecordBody,{new:true});
        if(!record){
            return res.status(404).send(); 
        }
        return res.status(200).send(record);  
    } catch (error) {
        res.status(500).send(err);
    }
}

export const deleteExpense = async(req,res)=>{
    try {
        const id = req.params.id;
        const record = await Expense.findByIdAndDelete(id);
        
        if(!record){
            return res.status(404).send(); 
        }
        return res.status(200).send(record);  
    } catch (error) {
        res.status(500).send(error);
    }
}