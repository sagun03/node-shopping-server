import { Request, Response } from "express";
// import ProductService from "../../services/products/ProductService";
import OrderService from "../services/orders/orderService";
import { orderDTO, orderInputDTO } from "../dto/orders/orderDTO";
import limiter from "../emailConfig/emailLimiter";
import sendEmail from "../utilities/sendMail";
import UserService from "../services/users/userService";
import { generateOrderSummary } from "../utilities/smsMapper";
import sendSms from "../utilities/sendSms";
import sendMessage from "../utilities/sendMessage";
import consumer from "../utilities/consumer";

class OrderController {
  private static instance: OrderController;
  private orderService: OrderService;
  private userService: UserService;


  private constructor() {

    this.orderService = new OrderService()
    this.userService = new UserService()
  }

  static getInstance(): OrderController {
    if (!OrderController.instance) {
        OrderController.instance = new OrderController();
    }
    return OrderController.instance;
  }
  // CREATE a new order
  async createOrder(req: Request, res: Response): Promise<void > {
    try {
      const orderInput: orderInputDTO = req.body;
      const createdOrder = await this.orderService.createOrder(orderInput);
      if (createdOrder) {
        const user = await this.userService.getByUid(createdOrder.userId);
        const recipients = [user?.email];
        const limitedSendEmail = limiter.wrap(sendEmail);
        const emailPromises = recipients.map((recipient: string) => limitedSendEmail(createdOrder, recipient));
        await Promise.all(emailPromises);
        const userContact = {
          phone: '+917046048033' // User's phone number , for now it is static
        };
        const orderSummaryMessage = generateOrderSummary(createdOrder);
        sendSms(userContact.phone,orderSummaryMessage)
        res.status(200).json(createdOrder);
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create order", error: error.message });
    }
  }
  // GET ALL orders
  async getAllorders(req: Request, res: Response): Promise<void> {
    try {
      const orders: orderDTO[] = await this.orderService.getAllOrders();
      sendMessage("order-topic", JSON.stringify(orders))
      res.status(200).json(orders);
    } catch (error: any) {
            res.status(500).json({ message: "Failed to get orders", error: error.message });
    }
  }
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderID: string = req.params.id;
      const product: orderDTO | null = await this.orderService.getOrderById(orderID);
      const topic = 'order-topic';
      const message = JSON.stringify({
        orderId: 400023,
        userId: '667d5f1c4ae8f18073cb5334',
        pointsUsed: 800,
        totalAmount: '900.99',
        orderDate: '2024-06-27T13:13:46.000Z',
        status: 'Pending',
        products: [
          {
            quantity: 1,
            subTotal: '200.99',
            productDetails: {
              id: '6654c76522930dc2de3c93f7',
              name: 'Dish Gel 6',
              price: 200.99,
              imageURL: 'https://thejkproducts.com/static/media/dishgel500ml.953a47586f8c4f471fc6.png',
            },
          },
        ],
      });
      
      sendMessage(topic, message)
  .then(() => console.log('Message sent successfully'))
  .catch((error) => console.error('Error sending message:', error));
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
  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId: string = req.params.id;
      await this.orderService.deleteOrder(orderId);
      res.status(200).json({ message: "Order has been deleted" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
  }
}

export default OrderController;
