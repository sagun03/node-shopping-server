import express, { Request, Response } from 'express';
import ProductController from '../controllers/products/product.controller';
import { verifyToken } from '../middlewares/auth/jwt';

const router = express.Router();
const productController = ProductController.getInstance();

// CREATE a new product
router.post('/', verifyToken, async (req: Request, res: Response) => {
  await productController.createProduct(req, res);
});

// UPDATE an existing product
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  await productController.updateProduct(req, res);
});

// DELETE a product
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  await productController.deleteProduct(req, res);
});

// GET a product by ID
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  await productController.getProductById(req, res);
});

// GET ALL products
router.get('/', verifyToken, async (req: Request, res: Response) => {
  await productController.getAllProducts(req, res);
});

export default router;
