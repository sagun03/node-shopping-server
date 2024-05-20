import { Router } from "express";
import OrderRourtes from './routes/order.routes'
import AuthRouters from './routes/auth.routes';

const router = Router();

router.use('/auth', AuthRouters)
router.use('/orders', OrderRourtes)

export default router