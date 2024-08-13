// src/swaggerSchema/orderManagementSchema.ts

export const cartSchemaDTO = {
  type: "object",
  properties: {
    CartID: {
      type: "integer",
    },
    userId: {
      type: "string",
    },
    totalQuantity: {
      type: "integer",
    },
    products: {
      type: "array",
      items: {
        $ref: "#/components/schemas/ProductDTO",
      },
    },
  },
};

export const cartInputSchemaDTO = {
  title: "Cart",
  type: "object",
  properties: {
    userId: {
      type: "string",
    },

    Products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productID: {
            type: "string",
          },
          Quantity: {
            type: "number",
          },
          UnitPrice: {
            type: "number",
            format: "double",
          },
        },
        required: ["productID", "Quantity", "UnitPrice"],
      },
    },
  },
  required: ["userId", "Products"],
};
