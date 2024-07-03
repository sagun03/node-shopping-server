import express, { Request, Response } from 'express';
import OrderController from '../controllers/order.controller';
<<<<<<< HEAD
import { orderSchema } from '../schemas/orderManagementSchema/orderSchema';
import { validateOrderId } from '../middlewares/orderManagementMiddleware/orderMiddleware';
import { validateOrder } from '../middlewares/orderManagementMiddleware/orderMiddleware';
import { verifyToken } from '../middlewares/auth/jwt';
=======
import { validateOrder,validateOrderId } from '../middlewares/orderManagementMiddleware/orderMiddleware';
import { orderSchema } from '../schemas/orderManagementSchema/orderSchema';
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = express.Router();
const orderController = OrderController.getInstance();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDTO'
 */
<<<<<<< HEAD
router.get('/', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await orderController.getAllorders(req, res);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderInputDTO'
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDTO'
 */
<<<<<<< HEAD
router.post('/', verifyToken,  validateOrder(orderSchema),async (req: Request, res: Response) => {
  await orderController.createOrder(req, res);
});
=======
router.post('/',  validateOrder(orderSchema), async (req: Request, res: Response) => {
  await orderController.createOrder(req, res);
});

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDTO'
 *       404:
 *         description: Order not found
 */
<<<<<<< HEAD
router.get('/:id', verifyToken,validateOrderId(), async (req: Request, res: Response) => {
  await orderController.getOrderById(req, res);
});
=======
router.get('/:id',validateOrderId(), async (req: Request, res: Response) => {
  await orderController.getOrderById(req, res);
});

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderInputDTO'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDTO'
 *       404:
 *         description: Order not found
 */
// UPDATE an existing order
<<<<<<< HEAD
router.put('/:id', verifyToken,  validateOrder(orderSchema),async (req: Request, res: Response) => {
=======
router.put('/:id',  validateOrder(orderSchema), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await orderController.updateOrder(req, res);
});
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *
 *                description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
<<<<<<< HEAD
router.delete('/:id', verifyToken,validateOrderId(),async (req: Request, res: Response) => {
=======
router.delete('/:id',validateOrderId(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await orderController.deleteOrder(req, res);
});

export default router;
