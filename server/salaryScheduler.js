import cron from 'node-cron';
import { User } from './database/userModel.js';
import { Expense } from './database/expenseModel.js';
import mongoose from 'mongoose';
// Function to add salary to user's account and record the transaction
const addMonthlySalary = async () => {
  try {
    const users = await User.find({});
    //console.log(users);
    const currentDate = new Date();

    for (let user of users) {
      const salaryDate = new Date(user.dateOfSalary);
      console.log(salaryDate);
      // Check if the current date is the salary date
      if (currentDate.getDate() === salaryDate.getDate()) {
        // Update user's money
        user.money = (user.money || 0) + user.salary;
        
        await user.save();
        //console.log(user.money);
        // Create an expense record for the salary
        const newExpense = new Expense({
          userId: user.userId,
          date: currentDate,
          description: 'Monthly Salary',
          amount: user.salary,
          category: 'Salary',
          paymentMethod: 'Bank Transfer'
        });
        //console.log(newExpense);
        await newExpense.save();
      }
    }
  } catch (error) {
    console.error('Error adding monthly salary:', error);
  }
};

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', addMonthlySalary);
