/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateOrderSummary = (order: any): string => {
  const productSummaries = order?.products
    .map(
      (product: {
        quantity: any;
        productDetails: { name: any; price: any };
      }) => {
        return `${product.quantity}x ${product.productDetails.name} @ $${product.productDetails.price}`;
      },
    )
    .join(", ");

  return `Order #${order.orderID}\nDate: ${new Date(order.orderDate).toLocaleDateString()}\nTotal: $${order.totalAmount}\nStatus: ${order.status}\nItems: ${productSummaries}\nPoints Used: ${order.pointsUsed}`;
};
