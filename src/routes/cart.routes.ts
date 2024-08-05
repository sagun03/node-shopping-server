import express, { Request, Response } from 'express';
import cartController from '../controllers/cart.controller';
import { validateOrder,validateOrderId } from '../middlewares/orderManagementMiddleware/orderMiddleware';
import { orderSchema } from '../schemas/orderManagementSchema/orderSchema';
import { verifyFirebaseToken } from '../middlewares/auth/firebaseJWT';
import { validateCart, validateCartId, validateUserID } from '../middlewares/orderManagementMiddleware/cartMiddleware';
import { cartSchema } from '../schemas/orderManagementSchema/cartSchema';
import { validateProductIdParam } from '../middlewares/product/productMiddleware';

const router = express.Router();
const CartController = cartController.getInstance();
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management API
 */

/**
 * @swagger
 * /cart/allCarts:
 *   get:
 *     summary: Get all Carts
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: List of all Carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cartDTO'
 */
router.get('/allCarts', async (req: Request, res: Response) => {
  await CartController.getAllCarts(req, res);
});

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add Products in a  Cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cartInputDTO'
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cartDTO'
 */
router.post('/', validateCart(cartSchema), async (req: Request, res: Response) => {
  await CartController.createCart(req, res);
});

/**
 * @swagger
 * /cart/byUserID:
 *   get:
 *     summary: Get cart by userId
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User Id
 *     responses:
 *       200:
 *         description: Cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cartDTO'
 *       404:
 *         description: Cart not found
 */
router.get('/byUserID', validateUserID(), async (req: Request, res: Response) => {
  await CartController.getCartByUserId(req, res);
});

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update an existing cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cartInputDTO'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cartDTO'
 *       404:
 *         description: Cart not founds
 */
// // UPDATE an existing cart
router.put('/:id', validateCart(cartSchema), async (req: Request, res: Response) => {
  await CartController.updateCart(req, res);
});
/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete an cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cart ID
 *     responses:
 *       200:
 *
 *                description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 */
router.delete('/:id', validateCartId(), async (req: Request, res: Response) => {
  await CartController.deleteCart(req, res);
});
router.delete('/cartProduct/:id', validateCartId(), async (req: Request, res: Response) => {
  await CartController.deleteCartProduct(req, res);
});

export default router;
