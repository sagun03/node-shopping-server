import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/mysql';
import { OrderItem } from './orderItems.model';


const Order = sequelize.define('Order', {
    OrderId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
       
    },
    UserId: {
        type: DataTypes.STRING,
        allowNull: false,
          },
    PointsUsed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    TotalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    OrderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    DeliveryAddressId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    PaymentId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    Status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    }
}, {
    tableName: 'Order',
    timestamps: false
});
Order.hasMany(OrderItem, { foreignKey: 'OrderId', as: 'OrderItems' });
export{Order};
