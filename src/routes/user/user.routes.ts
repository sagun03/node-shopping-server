import express, { NextFunction, Request, Response } from 'express';
import UserController from '../../controllers/users/user.controller';
import { revokeRefreshToken, verifyFirebaseToken } from '../../middlewares/auth/firebaseJWT';

const router = express.Router();
const controller = UserController.getControllerInstance();

// swagger
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management API
 */
// end-point for getting all users
// expects: void
// swagger
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDTO'
 */
router.get('/', async (req: Request, res: Response) => {
    await controller.getallUsers(req, res);
});

// end-point for getting user by id
// expects: id as url parameters
// swagger
/**
 * @swagger
 * /user/getuser/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */
router.get('/getuser/:id', async (req: Request, res: Response) => {
    await controller.getUserByID(req, res);
});

// end-point for getting user by name and email
// expects: username and email as query parameters
// swagger
/**
 * @swagger
 * /user/getuser:
 *   get:
 *     summary: Get a user by name and email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: User name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User email
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */
router.get('/getuser/', async (req: Request, res: Response) => {
    await controller.getUserByEmail(req, res);
});

// end-point for deleting user
// expects: userID as url parameter
// swagger
/**
 * @swagger
 * /user/remove/{userID}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */
router.delete('/remove/:userID', async (req: Request, res: Response) => {
    await controller.deleteUser(req, res);
});

// end-point for registering user
// expects: username, email, password as body parameters
// swagger
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
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

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    console.log('registering user');
    console.log(req.body);
    next();
}, verifyFirebaseToken, async (req: Request, res: Response) => {
    await controller.createUser(req, res);
})

// end-point for login
// expects: username, password as body parameters
// swagger
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */

router.post('/login', verifyFirebaseToken, async (req: Request, res: Response) => {
    await controller.loginUser(req, res);
});

// end-point for signing out
// expects: uid as body parameter
// swagger
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */
router.post('/logout', revokeRefreshToken, async (req: Request, res: Response) => {
    res.status(200).send({ message: 'User logged out successfully' });
});

export default router;