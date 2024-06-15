import { Request, Response } from "express";
// import ProductService from "../../services/products/ProductService";
import OrderService from "../services/products/orderService";
import { orderDTO, orderInputDTO } from "../dto/products/orderDTO";

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
  // CREATE a new order
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderInput: orderInputDTO = req.body;
      const createdOrder: orderDTO = await this.orderService.createOrder(orderInput);
      console.log(createdOrder,"after controller")
      res.status(201).json(createdOrder);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create order", error: error.message });
    }
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
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderID: string = req.params.id;
      const product: orderDTO | null = await this.orderService.getOrderById(orderID);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get order", error: error.message });
    }
  }
  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId: string = req.params.id;
      const orderInput: orderInputDTO = req.body;
      const updatedOrder: orderDTO | null = await this.orderService.updateOrder(orderId, orderInput);
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update order", error: error.message });
    }
  }
}

export default OrderController;
