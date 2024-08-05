import { DataTypes } from 'sequelize';
import { Cart } from './cart.model'; 
import { sequelize } from '../../../config/mySql';

const CartItem = sequelize.define('CartItem', {
    CartItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CartID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'CartID'
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
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName:"CartItem",
    timestamps: false
});
// CartItem.belongsTo(Order, { x: 'OrderId', as: 'Order' });
export{ CartItem};
