import {
  InventoryDTO,
  InventoryInputDTO,
} from "../../dto/Inventory/InventoryDTO";
import { Inventory } from "../../models/mongodb/inventory.model";
class InventoryService {
  public async createInventory(
    inventoryInput: InventoryInputDTO,
  ): Promise<InventoryDTO> {
    const newInventory = new Inventory(inventoryInput);
    const savedInventory = await newInventory.save();
    return this.mapInventoryToDTO(savedInventory);
  }
  public async updateInventory(
    inventoryId: string,
    inventoryInput: InventoryInputDTO,
  ): Promise<InventoryDTO | null> {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      inventoryId,
      inventoryInput,
      { new: true },
    );
    return updatedInventory ? this.mapInventoryToDTO(updatedInventory) : null;
  }
  public async deleteInventory(productId: string): Promise<void> {
    await Inventory.findByIdAndDelete(productId);
  }
  public async getInventoryById(
    productId: string,
  ): Promise<InventoryDTO | null> {
    const product = await Inventory.findById(productId);
    return product ? this.mapInventoryToDTO(product) : null;
  }
  public async getAllInventory(): Promise<InventoryDTO[]> {
    const products = await Inventory.find();
    return products.map(this.mapInventoryToDTO);
  }

  // Utility function to map Inventory model to InventoryDTO
  private mapInventoryToDTO(inventory: any): InventoryDTO {
    return {
      id: inventory._id,
      OfferId: inventory.OfferIds,
      productID: inventory.productID,
      quantity: inventory.quantity,
      location: inventory.location,
      status: inventory.status,
    };
  }
}

export default InventoryService;
