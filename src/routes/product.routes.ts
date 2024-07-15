import express, { Request, Response } from 'express';
import multer from 'multer';
import ProductController from '../controllers/products/product.controller';
import { validateImageUpload } from '../middlewares/Products/ProductsCategoryMiddleware';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const productController = ProductController.getInstance();

// CREATE a new product with image upload and validation
router.post('/upload', upload.single('image'), validateImageUpload, async (req: Request, res: Response) => {
  await productController.createProduct(req, res);
});

// UPDATE an existing product with image upload and validation
router.put('/:id', upload.single('image'), validateImageUpload, async (req: Request, res: Response) => {
  await productController.updateProduct(req, res);
});
// DELETE a product
router.delete('/:id', async (req: Request, res: Response) => {
  await productController.deleteProduct(req, res);
});

// GET a product by ID
router.get('/:id', async (req: Request, res: Response) => {
  await productController.getProductById(req, res);
});

// GET ALL products
router.get('/', async (req: Request, res: Response) => {
  await productController.getAllProducts(req, res);
});

export default router;
