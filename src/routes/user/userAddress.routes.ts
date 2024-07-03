import express, { Request, Response } from 'express';
import UserAddressController from '../../controllers/users/userAddress.controller';
import { addressSchema, validateAddress } from '../../middlewares/user/userAddressValidation';
<<<<<<< HEAD
import { verifyToken } from '../../middlewares/auth/jwt';
=======
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = express.Router();
const controller = UserAddressController.getControllerInstance();


// end-point for getting user address by id
// expects: user id as url parameter
<<<<<<< HEAD
router.get('/get/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/get/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.getEntry(req, res);
});

// end-point for creating new user address entry
// expects: request body with { userId, street, city, country, zipCode }
<<<<<<< HEAD
router.post('/create/', verifyToken, validateAddress(addressSchema), async (req: Request, res: Response) => {
=======
router.post('/create/', validateAddress(addressSchema), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.putEntry(req, res);
});

// end-point for deleting user address
// expects: user id as url parameter
<<<<<<< HEAD
router.delete('/remove/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.delete('/remove/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    await controller.deleteEntry(req, res);
});

export default router;