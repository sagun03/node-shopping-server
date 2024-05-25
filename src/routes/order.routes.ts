import express, { Request, Response } from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();
const orderController = OrderController.getInstance();

// GET ALL orders
router.get('/', async (req: Request, res: Response) => {
  await orderController.getAllorders(req, res);
});

export default router;
