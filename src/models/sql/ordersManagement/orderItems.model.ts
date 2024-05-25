import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/mysql';
import { Order } from './order.model';

const OrderItem = sequelize.define('OrderItem', {
    orderItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'OrderId'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false
});
// OrderItem.belongsTo(Order, { x: 'OrderId', as: 'Order' });
export{ OrderItem};
