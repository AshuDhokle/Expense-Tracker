import Express from 'express'
import { getUser, updateSalary } from '../controllers/User/userController.js';
const router = Express.Router();

router.get('/:userId',getUser)

router.patch('/:userId',updateSalary)  

export default router
