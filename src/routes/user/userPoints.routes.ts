import express, { Request, Response } from 'express';
import UserPointsController from '../../controllers/users/userPoints.contoller';

const router = express.Router();
const controller = UserPointsController.getControllerInstance();


// end-point for getting user points by id
// expects: user id as url parameter
router.get('/get/:id', async (req: Request, res: Response) => {
    await controller.getEntry(req, res);
});

// end-point for creating new user points entry
// expects: request body with { userId, transactionType, reason }
router.post('/create/', async (req: Request, res: Response) => {
    await controller.putEntry(req, res);
});

// end-point for deleting user points
// expects: user id as url parameter
router.delete('/remove/:id', async (req: Request, res: Response) => {
    await controller.deleteEntry(req, res);
});

export default router;