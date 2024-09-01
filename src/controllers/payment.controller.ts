import { Request, Response } from "express";
// import ProductService from "../../services/products/ProductService";
import OrderService from "../services/orders/orderService";
// import limiter from "../emailConfig/emailLimiter";
// import sendEmail from "../utilities/sendMail";
import PyamentService from "../services/paymentService";
// import { generateOrderSummary } from "../utilities/smsMapper";
// import sendSms from "../utilities/sendSms";
// import sendMessage from "../utilities/sendMessage";
// import consumer from "../utilities/consumer";

class PaymentController {
  private static instance: PaymentController;
  private orderService: OrderService;
  private paymentService: PyamentService;

  private constructor() {
    this.orderService = new OrderService();
    this.paymentService = new PyamentService();
  }

  static getInstance(): PaymentController {
    if (!PaymentController.instance) {
      PaymentController.instance = new PaymentController();
    }
    return PaymentController.instance;
  }
  // CREATE a new order
  async createPyament(req: Request, res: Response): Promise<void> {
    try {
      const { amount } = req.body;
      const createdPayment = await this.paymentService.createPayment(amount);
      if (createdPayment) {
        // Sending order through sms and email , uncpmment when it will be used

        // const user = await this.userService.getById(createdOrder.userId);
        // const recipients = [user?.email];
        // const limitedSendEmail = limiter.wrap(sendEmail);
        // const emailPromises = recipients.map((recipient: string) => limitedSendEmail(createdOrder, recipient));
        // await Promise.all(emailPromises);
        // const userContact = {
        //   phone: '+917046048033' // User's phone number , for now it is static
        // };
        // const orderSummaryMessage = generateOrderSummary(createdOrder);
        // sendSms(userContact.phone,orderSummaryMessage)
        res.status(200).json({ message: "sucesss", data: createdPayment });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to create payemnt", error: error.message });
    }
  }
}

export default PaymentController;
