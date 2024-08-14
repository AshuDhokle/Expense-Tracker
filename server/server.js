import dotenv from 'dotenv'
import Express from 'express'
import cors from 'cors'
import { Connection } from './database/connection.js'
import expenseRouter from './routes/expenseTrackerRouter.js'
import userRouter from './routes/userRoutes.js'
import './salaryScheduler.js'
import clerkWebhook from './webhooks/clerkWebhook.js'
dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));
const port = 3000 || process.env.PORT;

Connection._connection();

app.use('/expense-records',expenseRouter)
app.use('/user-router',userRouter)
app.use('/api',clerkWebhook)


app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
})