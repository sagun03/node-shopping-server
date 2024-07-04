import express, { Request, Response } from 'express';
import UserController from '../../controllers/users/user.controller';
import { verifyToken } from '../verifyToken.routes';

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
router.get('/', verifyToken, async (req: Request, res: Response) => {
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
router.get('/getuser/:id', verifyToken, async (req: Request, res: Response) => {
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
router.get('/getuser/', verifyToken, async (req: Request, res: Response) => {
    await controller.getUserByNameEmail(req, res);
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
router.delete('/remove/:userID', verifyToken, async (req: Request, res: Response) => {
    await controller.deleteUser(req, res);
});

export default router;