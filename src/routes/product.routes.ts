import express, { Request, Response } from 'express';
import ProductController from '../controllers/products/product.controller';
import { validateProductIdParam, validateProductPostBody } from '../middlewares/product/productMiddleware';

const router = express.Router();
const productController = ProductController.getInstance();

// CREATE a new product
router.post('/', validateProductPostBody, async (req: Request, res: Response) => {
  await productController.createProduct(req, res);
});

// UPDATE an existing product
router.put('/:id', validateProductIdParam, async (req: Request, res: Response) => {
  await productController.updateProduct(req, res);
});

// DELETE a product
router.delete('/:id', validateProductIdParam, async (req: Request, res: Response) => {
  await productController.deleteProduct(req, res);
});

// GET a product by ID
router.get('/:id', validateProductIdParam, async (req: Request, res: Response) => {
  await productController.getProductById(req, res);
});

// GET ALL products
router.get('/', async (req: Request, res: Response) => {
  await productController.getAllProducts(req, res);
});

export default router;
