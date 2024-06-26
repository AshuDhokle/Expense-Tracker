import dotenv from 'dotenv';
import Express from 'express'
import bodyParser from 'body-parser';
import { Expense } from '../database/expenseModel.js'
const router = Express.Router();

dotenv.config();

router.get('/',(req,res)=>{
    res.send('hello')
})



router.get(`/getAllByUserID/:userId`, async (req,res)=>{
   try {
    const userId = req.params.userId;
    const records = await Expense.find({userId:userId});
    
   // console.log(records);
    if(records.length === 0){
        return res.status(404).send('No records found for the user');
    }
    return res.status(200).send(records);
   } catch (error) {
    return res.status(500).send(error);
   }   
})

router.post('/',async (req,res)=>{
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
})

router.put('/:id',async(req,res)=>{
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
});

router.delete('/:id',async(req,res)=>{
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
})

export default router;