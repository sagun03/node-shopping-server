import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();
const userController: UserController = UserController.getControllerInstance();

// create new user
router.post('/post', async (req: Request, res: Response) => {
    await userController.postUser(res, req);
});

// get all users
router.get('/getall', async (req: Request, res: Response) => {
    await userController.getAllUsers(res, req);
});

userController.dispose();
export default router;