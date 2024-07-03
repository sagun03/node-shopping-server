import express, { Request, Response } from 'express';
import UserPointsController from '../../controllers/users/userPoints.contoller';
<<<<<<< HEAD
import { verifyToken } from '../../middlewares/auth/jwt';
const router = express.Router();
const controller = UserPointsController.getControllerInstance();

// swagger documentation
/**
 * @swagger
 * tags:
 *   name: UserPoints
 *   description: User points management
 */

// end-point for getting user points by id
// expects: user id as url parameter
// swagger documentation
/**
 * @swagger
 * /userPoints/get/{id}:
 *   get:
 *     summary: Get user points by id
 *     tags:
 *       - UserPoints
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User points found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPointsDTO'
 */
router.get('/get/:id', verifyToken, async (req: Request, res: Response) => {
=======

const router = express.Router();
const controller = UserPointsController.getControllerInstance();


// end-point for getting user points by id
// expects: user id as url parameter
router.get('/get/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.getEntry(req, res);
});

// end-point for creating new user points entry
// expects: request body with { userId, transactionType, reason }
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /userPoints/create:
 *   post:
 *     summary: Create a new user points
 *     tags: [UserPoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPointsInputDTO'
 *     responses:
 *       200:
 *         description: User points created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPointsDTO'
 */

router.post('/create/', verifyToken, async (req: Request, res: Response) => {
=======
router.post('/create/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.putEntry(req, res);
});

// end-point for deleting user points
// expects: user id as url parameter
<<<<<<< HEAD
// swagger documentation
/**
 * @swagger
 * /userPoints/remove/{id}:
 *   delete:
 *     summary: Delete user points by ID
 *     tags:
 *       - UserPoints
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User points deleted
 *       404:
 *         description: User points not found
 */
router.delete('/remove/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.delete('/remove/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.deleteEntry(req, res);
});

export default router;