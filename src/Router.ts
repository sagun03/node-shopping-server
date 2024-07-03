import { Router } from "express";
 import OrderRoutes from './routes/order.routes';
 import AuthRoutes from './routes/auth.routes';
 import ProductRoutes from './routes/product.routes';
 import InventoryRoutes from './routes/inventory.routes';
 import OfferRoutes from './routes/Offers.routes';
 import ReviewRoutes from './routes/review.routes';
 import CategoryRoutes from './routes/category.routes';
 import UserPointsRouters from './routes/user/userPoints.routes'
 import UserAddressRouters from './routes/user/userAddress.routes'
 import UserRouters from './routes/user/user.routes'

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

 export default router;