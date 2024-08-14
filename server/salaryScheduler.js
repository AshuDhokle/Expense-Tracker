import cron from 'node-cron';
import { User } from './database/userModel.js';
import { Expense } from './database/expenseModel.js';
const addMonthlySalary = async () => {
  try {
    const users = await User.find({});
    const currentDate = new Date();

    for (let user of users) {
      const salaryDate = new Date(user.dateOfSalary);
      if (currentDate.getDate() === salaryDate.getDate()) {
        user.money = (user.money || 0) + user.salary;
        
        await user.save();
        const newExpense = new Expense({
          userId: user.userId,
          date: currentDate,
          description: 'Monthly Salary',
          amount: user.salary,
          category: 'Salary',
          paymentMethod: 'Bank Transfer'
        });
        await newExpense.save();
      }
    }
  } catch (error) {
    console.error('Error adding monthly salary:', error);
  }
};

cron.schedule('0 0 * * *', addMonthlySalary);
