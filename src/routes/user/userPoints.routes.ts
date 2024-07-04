import express, { Request, Response } from 'express';
import UserPointsController from '../../controllers/users/userPoints.contoller';
import { verifyToken } from '../verifyToken.routes';
const router = express.Router();
const controller = UserPointsController.getControllerInstance();

// swagger
/**
 * @swagger
 * tags:
 *   name: UserPoints
 *   description: User Points Management API
 */
// end-point for getting user points by id
// expects: user id as url parameter
// swagger
/**
 * @swagger
 * /userPoints/get/{id}:
 *   get:
 *     summary: Get a user points by ID
 *     tags: [UserPoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User points details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPointsDTO'
 */
router.get('/get/:id', verifyToken, async (req: Request, res: Response) => {
    await controller.getEntry(req, res);
});

// end-point for creating new user points entry
// expects: request body with { userId, transactionType, reason }
// swagger
/**
 * @swagger
 * /userPoints/create/:
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
 *         description: User points created
 */
router.post('/create/', verifyToken, async (req: Request, res: Response) => {
    await controller.putEntry(req, res);
});

// end-point for deleting user points
// expects: user id as url parameter
// swagger
/**
 * @swagger
 * /userPoints/remove/{id}:
 *   delete:
 *     summary: Delete a user points by ID
 *     tags: [UserPoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User points deleted
 */
router.delete('/remove/:id', verifyToken, async (req: Request, res: Response) => {
    await controller.deleteEntry(req, res);
});

export default router;