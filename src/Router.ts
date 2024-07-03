import { Router } from "express";
import OrderRoutes from './routes/order.routes';
import AuthRoutes from './routes/auth.routes';
<<<<<<< HEAD
import OfferRoutes from './routes/Offers.routes';
import ReviewRoutes from './routes/review.routes';
import UserPointsRouters from './routes/user/userPoints.routes'
import UserAddressRouters from './routes/user/userAddress.routes'
import UserRouters from './routes/user/user.routes'
import ProductRoutes from './routes/product.routes';
import InventoryRoutes from './routes/inventory.routes';
import CategoryRoutes from './routes/category.routes';
=======
import ProductRoutes from './routes/product.routes';
import InventoryRoutes from './routes/inventory.routes';
import OfferRoutes from './routes/Offers.routes';
import ReviewRoutes from './routes/review.routes';
import CategoryRoutes from './routes/category.routes';
import UserPointsRouters from './routes/user/userPoints.routes'
import UserAddressRouters from './routes/user/userAddress.routes'
import UserRouters from './routes/user/user.routes'
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/orders', OrderRoutes);
router.use("/products", ProductRoutes);
router.use("/inventory", InventoryRoutes);
router.use("/offer", OfferRoutes);
router.use('/reviews', ReviewRoutes);
router.use('/categories', CategoryRoutes);
router.use("/user", UserRouters)
router.use("/user/points", UserPointsRouters)
router.use("/user/address", UserAddressRouters)
<<<<<<< HEAD

export default router;
=======

export default router;

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
