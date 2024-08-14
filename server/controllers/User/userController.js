import { User } from "../../database/userModel.js";

export const getUser = async(req,res)=>{
    try {
      const id = req.params;
      const user = await User.findOne({userId:id.userId})
      if(user){
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(404).send('user not found');
    }
}

export const updateSalary = async(req,res)=>{
    try {
      const id = req.params;
      const body = req.body;
      const updatedUser = await User.findOneAndUpdate({userId:id.userId},{salary:body.salary,dateOfSalary:body.dateOfSalary});
      if(updatedUser){
        return res.status(200).send(updatedUser);
      }
    } catch (error) {
      return res.status(400).send(error)
    }
}