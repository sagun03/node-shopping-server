import { Request, Response } from "express";
// import ProductService from "../../services/products/ProductService";
import OrderService from "../services/products/orderService";
import { orderDTO } from "../dto/products/orderDTO";

class OrderController {
  private static instance: OrderController;
  private orderService: OrderService;

  private constructor() {

    this.orderService = new OrderService()
  }

  static getInstance(): OrderController {
    if (!OrderController.instance) {
        OrderController.instance = new OrderController();
    }
    return OrderController.instance;
  }

  // GET ALL orders
  async getAllorders(req: Request, res: Response): Promise<void> {
    try {
      const orders: orderDTO[] = await this.orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get orders", error: error.message });
    }
  }
}

export default OrderController;
