// InventoryDTO.ts
export interface InventoryDTO {
  id: string;
  productID: string;
  quantity: number;
  location: string;
  status: 'in stock' | 'out of stock';
}

export interface InventoryInputDTO {
  productID: string;
  quantity: number;
  location: string;
  status: 'in stock' | 'out of stock';
}
