import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();
const userController: UserController = UserController.getControllerInstance();

// create new user
router.post('/post', async (req: Request, res: Response) => {
    userController.postUser(res, req).then(data => {
        res.status(200);
        res.send(data);
    }).catch(error => {
        res.status(500);
        res.send({
            "error": error,
            "message": "Unable to save user!"
        })
    });
});

// get all users
router.get('/getall', async (req: Request, res: Response) => {
    userController.getAllUsers(res, req).then(data => {
        res.status(200);
        res.send(data);
    }).catch(error => {
        res.status(500);
        res.send({
            "error": error,
            "message": "Unable to save user!"
        })
    })
});

router.get('/close', async(req: Request, res: Response) => {
    userController.dispose();
})

export default router;