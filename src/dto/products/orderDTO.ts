
import { ProductDTO } from "./ProductDTO";
export interface orderDTO {
    orderID:number,
    userId: string;
    pointsUsed: number;
    totalAmount: string;
    orderDate: Date;
    deliveryAddressId: number;
    paymentId: number;
    status: string;
    // products: [{productDetails:ProductDTO[],quantity:number,subTotal:number}];

  }
  
  export interface orderInputDTO {
    userId: string;
    pointsUsed: number;
    totalAmount: string;
    orderDate: Date;
    deliveryAddressId: number;
    paymentId: number;
    status: string;
    products:[{
        productID:number,
        Quantity:number,
        UnitPrice:number,
        subTotal:number
    }]
  }