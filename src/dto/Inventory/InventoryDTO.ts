// InventoryDTO.ts
export interface InventoryDTO {
  id: string;
  productId: string;
  OfferId: string;
  quantity: number;
  location: string;
  status: "in stock" | "out of stock";
}

export interface InventoryInputDTO {
  productId: string;
  offerId: string;
  quantity: number;
  location: string;
  status: "in stock" | "out of stock";
}
