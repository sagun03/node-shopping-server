import { Router } from "express";
import OrderRourtes from './routes/order.routes'
import AuthRouters from './routes/auth.routes';
import ProductRouters from './routes/product.routes'
import InventoryRouters from './routes/inventory.routes'
import UserRouters from './routes/user/user.routes'
import UserPointsRouters from './routes/user/userPoints.routes'
import UserAddressRouters from './routes/user/userAddress.routes'

const router = Router();

router.use('/auth', AuthRouters)
router.use('/orders', OrderRourtes)
router.use("/products", ProductRouters)
router.use("/Inventory",InventoryRouters)
router.use("/user", UserRouters)
router.use("/user/points", UserPointsRouters)
router.use("/user/address", UserAddressRouters)

export default router