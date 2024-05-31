import { Router } from "express";
import OrderRourtes from './routes/order.routes'
import AuthRouters from './routes/auth.routes';
import ProductRouters from './routes/product.routes'
import InventoryRouters from './routes/inventory.routes'

const router = Router();

router.use('/auth', AuthRouters)
router.use('/orders', OrderRourtes)
router.use("/products", ProductRouters)
router.use("/Inventory",InventoryRouters)


export default router