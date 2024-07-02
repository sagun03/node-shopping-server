import express, { Request, Response } from 'express';
import UserAddressController from '../../controllers/users/userAddress.controller';
import { addressSchema, validateAddress } from '../../middlewares/user/userAddressValidation';
import { verifyToken } from '../../middlewares/auth/jwt';

const router = express.Router();
const controller = UserAddressController.getControllerInstance();


// end-point for getting user address by id
// expects: user id as url parameter
router.get('/get/:id', verifyToken, async (req: Request, res: Response) => {
    await controller.getEntry(req, res);
});

// end-point for creating new user address entry
// expects: request body with { userId, street, city, country, zipCode }
router.post('/create/', verifyToken, validateAddress(addressSchema), async (req: Request, res: Response) => {
    await controller.putEntry(req, res);
});

// end-point for deleting user address
// expects: user id as url parameter
router.delete('/remove/:id', verifyToken, async (req: Request, res: Response) => {
    await controller.deleteEntry(req, res);
});

export default router;