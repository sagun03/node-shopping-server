/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {
  orderSchemaDTO,
  orderInputSchemaDTO,
} from "./src/swaggerSchema/orderManagementSchema";
import { productSchemaDTO } from "./src/swaggerSchema/productSchema";
import {
  cartSchemaDTO,
  cartInputSchemaDTO,
} from "./src/swaggerSchema/cartManagementSchema";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JK",
      version: "1.0.0",
      description: "JK-Washing-Solutions",
    },
    servers: [
      {
        url: "http://localhost:4000/jk",
      },
    ],
    components: {
      schemas: {
        OrderDTO: orderSchemaDTO,
        ProductDTO: productSchemaDTO,
        orderInputDTO: orderInputSchemaDTO,
        cartDTO: cartSchemaDTO,
        cartInputDTO: cartInputSchemaDTO,
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Adjust the path to your route files
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: {
  use: (
    arg0: string,
    arg1: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[],
    arg2: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >,
  ) => void;
}) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
