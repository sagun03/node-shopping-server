export const productSchemaDTO = {
  type: 'object',
  properties: {
    quantity: {
      type: 'integer',
    },
    subTotal: {
      type: 'string',
      format: 'decimal',
    },
    productDetails: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        price: {
          type: 'number',
          format: 'float',
        },
        categoryId: {
          type: 'string',
        },
        imageURL: {
          type: 'string',
          format: 'url',
        },
        reviews: {
          type: 'array',
          items: {
            type: 'object',  // This assumes reviews are objects; adjust as needed
          },
        },
      },
      required: ['id', 'name', 'description', 'price', 'categoryId', 'imageURL'],
    },
  },
  required: ['quantity', 'subTotal', 'productDetails'],
};