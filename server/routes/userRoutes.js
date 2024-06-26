import Express from 'express'
import { User } from '../database/userModel.js';
const router = Express.Router();

router.get('/:userId',async(req,res)=>{
    try {
      const id = req.params;
      
      const user = await User.findOne({userId:id.userId})
      if(user){
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(404).send('user not found');
    }
  })

router.patch('/:userId',async(req,res)=>{
    try {
      const id = req.params;
      const body = req.body;
      const updatedUser = await User.findOneAndUpdate({userId:id.userId},{salary:body.salary,dateOfSalary:body.dateOfSalary});
      //console.log(updatedUser);
      if(updatedUser){
        return res.status(200).send(updatedUser);
      }
    } catch (error) {
      return res.status(400).send(error)
    }
})  

export default router
