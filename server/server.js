import dotenv from 'dotenv'
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Webhook } from 'svix';
import { Connection } from './database/connection.js'
import expenseRouter from './routes/expenseTrackerRouter.js'
import userRouter from './routes/userRoutes.js'
import {User} from './database/userModel.js';
import './salaryScheduler.js'
dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));
const port = 3000 || process.env.PORT;

Connection._connection();

app.use('/expense-records',expenseRouter)
app.use('/user-router',userRouter)

app.post(
    '/api/webhook',
    bodyParser.raw({ type: 'application/json' }),
    async function (req, res) {
      try {
        const payloadString = req.body;
        const svixHeaders = req.headers;
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        //const evt = await wh.verify(payloadString, svixHeaders);
        // Handle the webhooks
        const eventType = payloadString.type;
        //console.log(eventType);
        if (eventType === 'user.created') {
          const userDetails = {
            email:payloadString.data.email_addresses.email_address,
            first_name:payloadString.data.first_name,
            last_name:payloadString.data.last_name,
            user_name:payloadString.data.username,
            id:payloadString.data.id,
          }
          
          const user = {
            userDetails,
            salary:0,
            dateOfSalary:0,
            expenseRecords:[],
            userId:payloadString.data.id,
          }
          
          const existingUser = await User.find({userDetails:userDetails})
          if(existingUser.length == 0){
            const newUser = await User(user);
          
            const savedUser = await newUser.save();
          
            if(savedUser){
              return res.status(200).json({
                success: true,
                message: 'Webhook received',    
              })
            }
          }else{
            console.log('Already exisiting user');
          } 
        }
        
        res.status(200).json({
          success: true,
          message: 'Webhook received',
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }
  );


app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})