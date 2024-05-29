import { Router } from "express";
import OrderRourtes from './routes/order.routes'
import AuthRouters from './routes/auth.routes';
import ProductRouters from './routes/product.routes'
import UserRouters from './routes/user.routes'
const router = Router();

router.use('/auth', AuthRouters)
router.use('/orders', OrderRourtes)
router.use("/products", ProductRouters)
router.use("/user", UserRouters)

export default router