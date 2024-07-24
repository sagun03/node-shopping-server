import express, { Request, Response } from 'express';
import UserAddressController from '../../controllers/users/userAddress.controller';
import { addressSchema, validateAddress } from '../../middlewares/user/userAddressValidation';
import { verifyFirebaseToken } from '../../middlewares/auth/firebaseJWT';
const router = express.Router();
const controller = UserAddressController.getControllerInstance();

// swagger
/**
 * @swagger
 * tags:
 *   name: User Address
 *   description: User Address Management API
 */
// end-point for getting user address by id
// expects: user id as url parameter
// swagger
/**
 * @swagger
 * /userAddress/get/{id}:
 *   get:
 *     summary: Get a user address by ID
 *     tags: [User Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User address details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAddressDTO'
 */
router.get('/get/:id', verifyFirebaseToken, async (req: Request, res: Response) => {
    await controller.getEntry(req, res);
});

// end-point for creating new user address entry
// expects: request body with { userId, street, city, country, zipCode }
// swagger
/**
 * @swagger
 * /userAddress/create/:
 *   post:
 *     summary: Create a new user address
 *     tags: [User Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAddressInputDTO'
 *     responses:
 *       200:
 *         description: User address created
 *       400:
 *         description: Invalid request body
 */

router.post('/create/', verifyFirebaseToken, validateAddress(addressSchema), async (req: Request, res: Response) => {
    await controller.putEntry(req, res);
});

// end-point for deleting user address
// expects: user id as url parameter
// swagger
/**
 * @swagger
 * /userAddress/remove/{id}:
 *   delete:
 *     summary: Delete user address
 *     tags: [User Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User address deleted
 *       400:
 *         description: Invalid request body
 */
router.delete('/remove/:id', verifyFirebaseToken, async (req: Request, res: Response) => {
    await controller.deleteEntry(req, res);
});

export default router;