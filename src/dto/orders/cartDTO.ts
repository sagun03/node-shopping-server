import { ProductDTO } from "../products/ProductDTO";
export interface cartDTO {
  CartID: number;
  userId: string;
  totalQuantity: number;
  products?: cartItemDTO[];
}
interface cartItemDTO {
  quantity: number;
  unitPrice: number;
  productDetails?: ProductDTO;
}
export interface cartInputDTO {
  userId: string;
  Products: [
    {
      productId: string;
      Quantity: number;
      UnitPrice: number;
      size: string;
    },
  ];
}
