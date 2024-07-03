import express, { Request, Response } from 'express';
import UserController from '../../controllers/users/user.controller';
import { User, validateUser} from '../../middlewares/user/userValidation';
<<<<<<< HEAD
import { verifyToken, generateToken } from '../../middlewares/auth/jwt'
=======

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = express.Router();
const controller = UserController.getControllerInstance();

<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

// end-point for getting all users
// expects: void
// swagger documentation
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDTO'
 */
=======
// end-point for getting all users
// expects: void
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
router.get('/', async (req: Request, res: Response) => {
    await controller.getallUsers(req, res);
});

// end-point for getting user by id
// expects: id as url parameters
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /users/getuser/{id}:
 *   get:
 *     summary: Get user by id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       404:
 *         description: User not found
 */
router.get('/getuser/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/getuser/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.getUserByID(req, res);
});

// end-point for getting user by name and email
// expects: username and email as query parameters
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /users/getuser/:
 *   get:
 *     summary: Get user by name and email
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       404:
 *         description: User not found
 */
router.get('/getuser/', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/getuser/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.getUserByNameEmail(req, res);
});

// end-point for getting user by login credentials
// expects: username and email as request body
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: Get user by login credentials
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       404:
 *         description: User not found
 */
router.get('/login', async (req: Request, res: Response) => {
=======
router.get('/getlogin/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.loginUser(req, res);
});

// end-point for creating new user
// expects: request body with username, email, password at least
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */
router.post('/register', validateUser(User), async (req: Request, res: Response) => {
=======
router.post('/create', validateUser(User), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.createUser(req, res);
});

// end-point for deleting user
// expects: userID as url parameter
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /users/remove/{userID}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/remove/:userID', verifyToken, async (req: Request, res: Response) => {
=======
router.delete('/remove/:userID', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.deleteUser(req, res);
});

export default router;