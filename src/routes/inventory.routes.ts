import express, { Request, Response } from 'express';
<<<<<<< HEAD
import { verifyToken } from '../middlewares/auth/jwt';
import InventoryController from '../controllers/Inventory/inventory.controller';
import { validateInventoryData, validateInventoryId } from '../middlewares/InventoryManagement/InventoryMiddleware';
import { inventorySchema } from '../schemas/InventoryManagement/InventorySchema';
import e from 'express';

=======
import InventoryController from '../controllers/Inventory/inventory.controller';
import { validateInventoryData, validateInventoryId } from '../middlewares/InventoryManagement/InventoryMiddleware';
import { inventorySchema } from '../schemas/InventoryManagement/InventorySchema';
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = express.Router();
const inventoryController = InventoryController.getInstance();

/**
<<<<<<< HEAD
  * @swagger
  * tags:
  *   name: Inventory
  *   description: Inventory Management API
  */

 /**
  * @swagger
  * components:
  *   schemas:
  *     InventoryDTO:
  *       type: object
  *       properties:
  *         id:
  *           type: string
  *         productID:
  *           type: string
  *         offerId:
  *           type: string
  *         quantity:
  *           type: number
  *         location:
  *           type: string
  *         status:
  *           type: string
  *           enum: [in stock, out of stock]
  *     InventoryInputDTO:
  *       type: object
  *       properties:
  *         productID:
  *           type: string
  *         offerId:
  *           type: string
  *         quantity:
  *           type: number
  *         location:
  *           type: string
  *         status:
  *           type: string
  *           enum: [in stock, out of stock]
  */

 /**
  * @swagger
  * /inventory:
  *   post:
  *     summary: Create a new inventory
  *     tags: [Inventory]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/InventoryInputDTO'
  *     responses:
  *       201:
  *         description: Inventory created successfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/InventoryDTO'
  *       400:
  *         description: Invalid input
  */
 router.post('/', verifyToken, validateInventoryData(), async (req: Request, res: Response) => {
=======
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory Management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InventoryDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         productID:
 *           type: string
 *         offerId:
 *           type: string
 *         quantity:
 *           type: number
 *         location:
 *           type: string
 *         status:
 *           type: string
 *           enum: [in stock, out of stock]
 *     InventoryInputDTO:
 *       type: object
 *       properties:
 *         productID:
 *           type: string
 *         offerId:
 *           type: string
 *         quantity:
 *           type: number
 *         location:
 *           type: string
 *         status:
 *           type: string
 *           enum: [in stock, out of stock]
 */

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create a new inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryInputDTO'
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryDTO'
 *       400:
 *         description: Invalid input
 */
router.post('/', validateInventoryData(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await inventoryController.createInventory(req, res);
});

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     summary: Update an existing inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Inventory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryInputDTO'
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryDTO'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Inventory not found
 */
<<<<<<< HEAD
router.put('/:id', verifyToken, validateInventoryId(), validateInventoryData(), async (req: Request, res: Response) => {
=======
router.put('/:id', validateInventoryId(), validateInventoryData(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await inventoryController.updateInventory(req, res);
});

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: Delete an inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 *       404:
 *         description: Inventory not found
 */
<<<<<<< HEAD
router.delete('/:id', verifyToken, validateInventoryId(), async (req: Request, res: Response) => {
=======
router.delete('/:id', validateInventoryId(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await inventoryController.deleteInventory(req, res);
});

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Get an inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryDTO'
 *       404:
 *         description: Inventory not found
 */
<<<<<<< HEAD
router.get('/:id', verifyToken, validateInventoryId(), async (req: Request, res: Response) => {
=======
router.get('/:id', validateInventoryId(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await inventoryController.getInventoryById(req, res);
});

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryDTO'
 */
<<<<<<< HEAD
router.get('/', verifyToken, async (req: Request, res: Response) => {
  await inventoryController.getAllInventories(req, res);
});

export default router;
=======
router.get('/', async (req: Request, res: Response) => {
  await inventoryController.getAllInventories(req, res);
});

export default router;
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
