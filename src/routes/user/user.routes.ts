import express, { Request, Response } from 'express';
import UserController from '../../controllers/users/user.controller';
import { User, validateUser} from '../../middlewares/user/userValidation';


const router = express.Router();
const controller = UserController.getControllerInstance();

// end-point for getting all users
// expects: void
router.get('/', async (req: Request, res: Response) => {
    await controller.getallUsers(req, res);
});

// end-point for getting user by id
// expects: id as url parameters
router.get('/getuser/:id', async (req: Request, res: Response) => {
    await controller.getUserByID(req, res);
});

// end-point for getting user by name and email
// expects: username and email as query parameters
router.get('/getuser/', async (req: Request, res: Response) => {
    await controller.getUserByNameEmail(req, res);
});

// end-point for getting user by login credentials
// expects: username and email as request body
router.get('/getlogin/', async (req: Request, res: Response) => {
    await controller.loginUser(req, res);
});

// end-point for creating new user
// expects: request body with username, email, password at least
router.post('/create', validateUser(User), async (req: Request, res: Response) => {
    await controller.createUser(req, res);
});

// end-point for deleting user
// expects: userID as url parameter
router.delete('/remove/:userID', async (req: Request, res: Response) => {
    await controller.deleteUser(req, res);
});

export default router;