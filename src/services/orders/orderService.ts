/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderItemInputDTO } from "../../dto/orders/orderItemsDTO";
import { ProductDTO } from "../../dto/products/ProductDTO";
import { orderDTO, orderInputDTO } from "../../dto/orders/orderDTO";
import { Order } from "../../models/sql/ordersManagement/order.model";
import { OrderItem } from "../../models/sql/ordersManagement/orderItems.model";
import ProductService from "../products/ProductService";
import { sequelize } from "../../config/mySql";
class OrderService {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  // GET ALL orders
  public async getAllOrders(): Promise<orderDTO[]> {
    const orders = await Order.findAll();

    // Assuming each order has an array of orderItems, you need to fetch order items for each order
    const orderDTOsPromises = orders.map(async (order: any) => {
      const orderItems = await this.getOrderItemsByOrderId(order.OrderId);
      // Replace this with your actual method to get order items
      return this.mapOrderToDTO(order, orderItems);
    });

    const orderDTOs: orderDTO[] = await Promise.all(orderDTOsPromises);
    return orderDTOs;
  }
  // CREATE a new order
  public async createOrder(
    orderInput: orderInputDTO,
  ): Promise<orderDTO | null> {
    const t = await sequelize.transaction();

    try {
      // Find existing order for the given user
      const existingOrder = await Order.findOne({
        where: { userId: orderInput?.userId },
        transaction: t,
      });

      let createdOrderID: string;

      if (existingOrder) {
        // Order exists, use its ID
        createdOrderID = existingOrder.dataValues.OrderId;
        console.log(`Existing order found with ID: ${createdOrderID}`);

        // Update or create order items
        await Promise.all(
          orderInput.Products.map(async (prodData: any) => {
            await this.createOrUpdateOrderItem(t, createdOrderID, prodData);
          }),
        );
      } else {
        // No existing order found, create a new order
        console.log("No existing order found. Creating a new order.");
        const newOrder = await Order.create(orderInput as any, {
          transaction: t,
        });
        createdOrderID = newOrder.dataValues.OrderId;
        console.log(`Created new order with ID: ${createdOrderID}`);

        // Create order items for the new order
        await Promise.all(
          orderInput.Products.map(async (prodData: any) => {
            await this.createOrderItem(t, createdOrderID, prodData);
          }),
        );
      }

      await t.commit();
      return this.getOrderById(createdOrderID);
    } catch (error) {
      await t.rollback();
      console.error("Failed to create order:", error);
      throw new Error("Failed to create order");
    }
  }

  public createOrderItem = async (
    transaction: any,
    orderID: string,
    prodData: any,
  ): Promise<void> => {
    const sampleData: orderItemInputDTO = {
      OrderID: orderID,
      ProductID: prodData?.productID,
      Quantity: prodData?.Quantity,
      UnitPrice: prodData?.UnitPrice,
      Subtotal: prodData?.subTotal.toFixed(2),
    };
    const newOrderItem = await OrderItem.create(sampleData as any, {
      transaction: transaction,
    });
    console.log(`Created new OrderItem: ${newOrderItem}`);
  };
  public createOrUpdateOrderItem = async (
    transaction: any,
    orderID: string,
    prodData: any,
  ): Promise<void> => {
    const existingOrderItem = await OrderItem.findOne({
      where: { OrderID: orderID, ProductID: prodData?.productID },
      transaction: transaction,
    });

    if (existingOrderItem) {
      // Update existing order item
      const updatedQuantity =
        existingOrderItem.dataValues.Quantity + prodData?.Quantity;
      const updatedSubtotal = (
        parseFloat(existingOrderItem.dataValues.Subtotal) +
        parseFloat(prodData?.subTotal)
      ).toFixed(2);

      await OrderItem.update(
        {
          Quantity: updatedQuantity,
          Subtotal: updatedSubtotal,
        },
        {
          where: { OrderID: orderID, ProductID: prodData?.productID },
          transaction: transaction,
        },
      );
    } else {
      // Create new order item
      await this.createOrderItem(transaction, orderID, prodData);
    }
  };

  public async getOrderById(orderID: string): Promise<orderDTO | null> {
    const order = await Order.findByPk(orderID);
    const orderItems = await OrderItem.findAll({
      where: { OrderId: orderID },
    });

    return order ? this.mapOrderToDTO(order, orderItems) : null;
  }

  public async getProductById(productId: string): Promise<ProductDTO | null> {
    const products = await this.productService.getProductById(productId);
    return products;
  }

  private async getOrderItemsByOrderId(orderId: string): Promise<any[]> {
    return OrderItem.findAll({ where: { OrderId: orderId } });
  }

  // UPDATE an existing product
  public async updateOrder(
    orderId: string,
    orderInput: orderInputDTO,
  ): Promise<orderDTO | null> {
    const [updatedRowsCount] = await Order.update(orderInput, {
      where: { OrderId: orderId },
    });

    if (updatedRowsCount > 0 && orderInput.Products?.length > 0) {
      // Delete existing order items
      await OrderItem.destroy({ where: { OrderID: orderId } });

      // Create new order items
      const orderItemsPromises = orderInput.Products.map(
        async (prodData: any) => {
          const sampleData: orderItemInputDTO = {
            OrderID: orderId,
            ProductID: prodData.productID,
            Quantity: prodData.Quantity,
            UnitPrice: prodData.UnitPrice,
            Subtotal: prodData.subTotal,
          };
          return OrderItem.create(sampleData as any);
        },
      );
      await Promise.all(orderItemsPromises);
    }
    return this.getOrderById(orderId);
  }
  public async deleteOrder(orderId: string): Promise<void> {
    await OrderItem.destroy({ where: { OrderID: orderId } });
    await Order.destroy({ where: { OrderID: orderId } });
  }
  private async mapOrderToDTO(order: any, orderItems?: any): Promise<orderDTO> {
    if (!order) {
      throw new Error("Invalid order object");
    }

    let products: any[] = [];

    if (Array.isArray(orderItems) && orderItems.length > 0) {
      const productDetailsPromises: Promise<any>[] = [];

      orderItems.forEach((item: any) => {
        if (item && item.ProductID) {
          const productDetailsPromise = this.getProductById(
            item.ProductID,
          ).then((productDetails) => ({
            quantity: item.Quantity || 0,
            subTotal: item.Subtotal || 0,
            productDetails: productDetails,
          }));
          productDetailsPromises.push(productDetailsPromise);
        }
      });

      products = await Promise.all(productDetailsPromises);
    }

    return {
      orderID: order.OrderId,
      userId: order.userId,
      pointsUsed: order.PointsUsed,
      totalAmount: order.TotalAmount,
      orderDate: order.OrderDate,
      deliveryAddressId: order.DeliveryAddressId,
      paymentId: order.PaymentId,
      status: order.Status,
      products: products,
    };
  }
}

export default OrderService;
