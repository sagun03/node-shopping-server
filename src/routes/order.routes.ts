import express, { Request, Response } from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();
const orderController = OrderController.getInstance();

// GET ALL orders
router.get('/', async (req: Request, res: Response) => {
  await orderController.getAllorders(req, res);
});
router.post('/', async (req: Request, res: Response) => {
  await orderController.createOrder(req, res);
});
router.get('/:id', async (req: Request, res: Response) => {
  await orderController.getOrderById(req, res);
});
// UPDATE an existing order
router.put('/:id', async (req: Request, res: Response) => {
  await orderController.updateOrder(req, res);
});
router.delete('/:id', async (req: Request, res: Response) => {
  await orderController.deleteOrder(req, res);
});

export default router;
