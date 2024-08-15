import { DataTypes } from "sequelize";
import { Order } from "./order.model";
import { sequelize } from "../../../config/mySql";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    OrderItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "OrderId",
      },
    },
    ProductID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "OrderItem",
    timestamps: false,
  },
);
// OrderItem.belongsTo(Order, { x: 'OrderId', as: 'Order' });
export { OrderItem };
