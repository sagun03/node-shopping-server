import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/mysql';
import { Order } from './order.model';

const OrderItem = sequelize.define('OrderItem', {
    OrderItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    OrderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'OrderId'
        }
    },
    ProductID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    UnitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName:"OrderItem",
    timestamps: false
});
// OrderItem.belongsTo(Order, { x: 'OrderId', as: 'Order' });
export{ OrderItem};
