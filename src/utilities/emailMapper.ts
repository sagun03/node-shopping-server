/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateOrderEmail(order: any): { text: string; html: string } {
  const text = `
  Order Confirmation
  
  Order ID: ${order.orderID}
  Points Used: ${order.pointsUsed}
  Total Amount: $${order.totalAmount}
  Order Date: ${new Date(order.orderDate).toDateString()}
  Status: ${order.status}
  
  
  Products:
  ${order.products
    .map(
      (product: any) => `
    Product Name: ${product.productDetails.name}
    Description: ${product.productDetails.description}
    Quantity: ${product.quantity}
    Price per unit: $${product.productDetails.price}
    Subtotal: $${product.subTotal}
    Image URL: ${product.productDetails.imageURL}
  `,
    )
    .join("\n")}
  `;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #007BFF;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #007BFF;
                margin: 0;
            }
            .order-details {
                margin-bottom: 20px;
            }
            .order-details p {
                margin: 5px 0;
            }
            .products {
                border-top: 2px solid #007BFF;
                padding-top: 10px;
            }
            .product {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                padding: 10px 0;
            }
            .product:last-child {
                border-bottom: none;
            }
            .product img {
                max-width: 100px;
                height: auto;
                border-radius: 5px;
            }
            .product-details {
                flex-grow: 1;
                margin-left: 20px;
            }
            .product-details h3 {
                margin: 0;
                color: #007BFF;
            }
            .product-details p {
                margin: 5px 0;
            }
            @media (max-width: 600px) {
                .product {
                    flex-direction: column;
                    align-items: center;
                }
                .product img {
                    margin-bottom: 10px;
                }
                .product-details {
                    margin-left: 0;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Confirmation</h1>
            </div>
            <div class="order-details">
                <p><strong>Order ID:</strong> ${order.orderID}</p>
                <p><strong>User ID:</strong> ${order.userId}</p>
                <p><strong>Points Used:</strong> ${order.pointsUsed}</p>
                <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toDateString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Delivery Address:</strong> ${order.deliveryAddressId ? order.deliveryAddressId : "Not provided"}</p>
                <p><strong>Payment ID:</strong> ${order.paymentId ? order.paymentId : "Not provided"}</p>
            </div>
            <div class="products">
                <h2>Products:</h2>
                ${order.products
                  .map(
                    (product: any) => `
                <div class="product">
                    <img src="${product.productDetails.imageURL}" alt="${product.productDetails.name}">
                    <div class="product-details">
                        <h3>${product.productDetails.name}</h3>
                        <p><strong>Description:</strong> ${product.productDetails.description}</p>
                        <p><strong>Quantity:</strong> ${product.quantity}</p>
                        <p><strong>Price per unit:</strong> $${product.productDetails.price}</p>
                        <p><strong>Subtotal:</strong> $${product.subTotal}</p>
                        <p><strong>Category ID:</strong> ${product.productDetails.categoryId}</p>
                    </div>
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </body>
    </html>
    
  `;

  return { text, html };
}
