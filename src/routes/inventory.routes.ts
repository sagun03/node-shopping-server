import express, { Request, Response } from "express";
import InventoryController from "../controllers/Inventory/inventory.controller";
import {
  validateInventoryData,
  validateInventoryId,
} from "../middlewares/InventoryManagement/InventoryMiddleware";
// import { inventorySchema } from "../schemas/InventoryManagement/InventorySchema";
import { verifyFirebaseToken } from "../middlewares/auth/firebaseJWT";
const router = express.Router();
const inventoryController = InventoryController.getInstance();

/**
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
router.post(
  "/",
  verifyFirebaseToken,
  validateInventoryData(),
  async (req: Request, res: Response) => {
    await inventoryController.createInventory(req, res);
  },
);

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
router.put(
  "/:id",
  verifyFirebaseToken,
  validateInventoryId(),
  validateInventoryData(),
  async (req: Request, res: Response) => {
    await inventoryController.updateInventory(req, res);
  },
);

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
router.delete(
  "/:id",
  verifyFirebaseToken,
  validateInventoryId(),
  async (req: Request, res: Response) => {
    await inventoryController.deleteInventory(req, res);
  },
);

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
router.get(
  "/:id",
  verifyFirebaseToken,
  validateInventoryId(),
  async (req: Request, res: Response) => {
    await inventoryController.getInventoryById(req, res);
  },
);

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
router.get("/", verifyFirebaseToken, async (req: Request, res: Response) => {
  await inventoryController.getAllInventories(req, res);
});

export default router;
