import { ProductDTO, ProductInputDTO } from "../../dto/products/ProductDTO";
import { orderDTO } from "../../dto/products/orderDTO";
// import { Order } from '../../models/mongodb/products.model';
import { Order } from "../../models/sql/ordersManagement/order.model";
import { OrderItem } from "../../models/sql/ordersManagement/orderItems.model";
class OrderService {
  constructor() {}

  // GET ALL orders
  public async getAllOrders(): Promise<orderDTO[]> {
    const order = await Order.findAll();
    return order.map(this.mapOrderToDTO);
  }

  // Utility function to map Product model to ProductDTO
  private mapOrderToDTO(order: any): orderDTO {
    return {
        orderID:order.OrderId,
        userId: order.UserId,
        pointsUsed: order.PointsUsed,
        totalAmount: order.TotalAmount,
        orderDate: order.OrderDate,
        deliveryAddressId: order.DeliveryAddressId,
        paymentId: order.PaymentId,
        status: order.Status
    };
  }
}

export default OrderService;
