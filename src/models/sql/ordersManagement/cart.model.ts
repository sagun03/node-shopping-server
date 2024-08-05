import { DataTypes } from 'sequelize';
import { CartItem } from './cartItems.model';
import { sequelize } from '../../../config/mySql';

const Cart = sequelize.define('Cart', {
    CartID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
       
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
          },
   
},{
    tableName: 'Cart',
    timestamps: false
});
Cart.hasMany(CartItem, { foreignKey: 'CartID', as: 'CartItems' });
export{Cart};
