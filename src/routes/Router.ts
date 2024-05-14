import { Router } from "express";
import OrderRourtes from './order.routes'
const router = Router();
router.use('/orders',OrderRourtes)

export default router