import { Router } from "express";
import OrderRoutes from './routes/order.routes';
import AuthRoutes from './routes/auth.routes';
import ProductRoutes from './routes/product.routes';
import InventoryRoutes from './routes/inventory.routes';
import OfferRoutes from  './routes/Offers.routes'; // Correct import statement

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/orders', OrderRoutes);
router.use("/products", ProductRoutes);
router.use("/inventory", InventoryRoutes);
router.use("/offer", OfferRoutes); // Use OfferRoutes with correct casing

export default router;
