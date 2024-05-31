import express, { Request, Response } from 'express';
import InventoryController from '../controllers/inventory.controller';

const router = express.Router();
const inventoryController = InventoryController.getInstance();

// CREATE a new inventory
router.post('/', async (req: Request, res: Response) => {
  await inventoryController.createInventory(req, res);
});

// UPDATE an existing inventory
router.put('/:id', async (req: Request, res: Response) => {
  await inventoryController.updateInventory(req, res);
});

// DELETE an inventory
router.delete('/:id', async (req: Request, res: Response) => {
  await inventoryController.deleteInventory(req, res);
});

// GET an inventory by ID
router.get('/:id', async (req: Request, res: Response) => {
  await inventoryController.getInventoryById(req, res);
});

// GET ALL inventories
router.get('/', async (req: Request, res: Response) => {
  await inventoryController.getAllInventories(req, res);
});

export default router;
