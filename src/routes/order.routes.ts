import express, { Request, Response } from 'express';
import OrderController from '../controllers/order.controller';
import { validateOrder,validateOrderId } from '../middlewares/orderManagementMiddleware/orderMiddleware';
import { orderSchema } from '../schemas/orderManagementSchema/orderSchema';
const router = express.Router();
const orderController = OrderController.getInstance();

// GET ALL orders
router.get('/', async (req: Request, res: Response) => {
  await orderController.getAllorders(req, res);
});
router.post('/',  validateOrder(orderSchema),async (req: Request, res: Response) => {
  await orderController.createOrder(req, res);
});
router.get('/:id',validateOrderId(), async (req: Request, res: Response) => {
  await orderController.getOrderById(req, res);
});
// UPDATE an existing order
router.put('/:id',  validateOrder(orderSchema),async (req: Request, res: Response) => {
  await orderController.updateOrder(req, res);
});
router.delete('/:id',validateOrderId(),async (req: Request, res: Response) => {
  await orderController.deleteOrder(req, res);
});

export default router;
