import dotenv from 'dotenv';
import Express from 'express'
import { addExpense, deleteExpense, getAllExpensesByUser, updateExpense } from '../controllers/Expense/expenseController.js';
const router = Express.Router();

dotenv.config();

router.get(`/getAllByUserID/:userId`, getAllExpensesByUser)

router.post('/',addExpense)

router.put('/:id',updateExpense);

router.delete('/:id',deleteExpense)

export default router;