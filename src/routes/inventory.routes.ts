import express, { Request, Response } from 'express';
import InventoryController from '../controllers/Inventory/inventory.controller';
import { validateInventoryData,validateInventoryId } from '../middlewares/InventoryManagement/InventoryMiddleware';
import { inventorySchema } from '../schemas/InventoryManagement/InventorySchema';
import { verifyToken } from '../middlewares/auth/jwt';

const router = express.Router();
const inventoryController = InventoryController.getInstance();

// POST - CREATE a new inventory
router.post('/', verifyToken, validateInventoryData(), async (req: Request, res: Response) => {
  await inventoryController.createInventory(req, res);
});

// PUT - UPDATE an existing inventory by ID
router.put('/:id', verifyToken, validateInventoryId(), validateInventoryData(), async (req: Request, res: Response) => {
  await inventoryController.updateInventory(req, res);
});

// DELETE - DELETE an inventory by ID
router.delete('/:id', verifyToken, validateInventoryId(), async (req: Request, res: Response) => {
  await inventoryController.deleteInventory(req, res);
});

// GET - GET an inventory by ID
router.get('/:id', verifyToken, validateInventoryId(), async (req: Request, res: Response) => {
  await inventoryController.getInventoryById(req, res);
});

// GET - GET ALL inventories
router.get('/', verifyToken, async (req: Request, res: Response) => {
  await inventoryController.getAllInventories(req, res);
});

export default router;
