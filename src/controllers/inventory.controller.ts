import { Request, Response } from "express";
import InventoryService from "../services/Inventory/InventoryServices";
import { InventoryDTO, InventoryInputDTO } from "../dto/Inventory/InventoryDTO";

class InventoryController {
  private static instance: InventoryController;
  private inventoryService: InventoryService;

  private constructor() {
    this.inventoryService = new InventoryService();
  }

  static getInstance(): InventoryController {
    if (!InventoryController.instance) {
      InventoryController.instance = new InventoryController();
    }
    return InventoryController.instance;
  }

  // CREATE a new inventory
  async createInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryInput: InventoryInputDTO = req.body;
      const createdInventory: InventoryDTO = await this.inventoryService.createInventory(inventoryInput);
      res.status(201).json(createdInventory);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create inventory", error: error.message });
    }
  }

  // UPDATE an existing inventory
  async updateInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: string = req.params.id;
      const inventoryInput: InventoryInputDTO = req.body;
      const updatedInventory: InventoryDTO | null = await this.inventoryService.updateInventory(inventoryId, inventoryInput);
      if (updatedInventory) {
        res.status(200).json(updatedInventory);
      } else {
        res.status(404).json({ message: "Inventory not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update inventory", error: error.message });
    }
  }

  // DELETE an inventory
  async deleteInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: string = req.params.id;
      await this.inventoryService.deleteInventory(inventoryId);
      res.status(200).json({ message: "Inventory has been deleted" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete inventory", error: error.message });
    }
  }

  // GET an inventory by ID
  async getInventoryById(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: string = req.params.id;
      const inventory: InventoryDTO | null = await this.inventoryService.getInventoryById(inventoryId);
      if (inventory) {
        res.status(200).json(inventory);
      } else {
        res.status(404).json({ message: "Inventory not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get inventory", error: error.message });
    }
  }

//   GET ALL inventories
  async getAllInventories(req: Request, res: Response): Promise<void> {
    try {
      const inventories: InventoryDTO[] = await this.inventoryService.getAllInventory();
      res.status(200).json(inventories);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get inventories", error: error.message });
    }
  }
}

export default InventoryController;
