import express, { Request, Response } from 'express';
import multer from 'multer';
import CategoryController from '../controllers/products/category.controller';
import { validateImageUpload } from '../middlewares/Products/ProductsCategoryMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const categoryController = CategoryController.getInstance();

// CREATE a new category with image upload
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  await categoryController.createCategory(req, res);
});


// UPDATE an existing category with image upload and validation
router.put('/:id', upload.single('image'), validateImageUpload, async (req: Request, res: Response) => {
  await categoryController.updateCategory(req, res);
});
// DELETE a category
router.delete('/:id', async (req: Request, res: Response) => {
  await categoryController.deleteCategory(req, res);
});

// GET a category by ID
router.get('/:id', async (req: Request, res: Response) => {
  await categoryController.getCategoryById(req, res);
});

// GET ALL categories
router.get('/', async (req: Request, res: Response) => {
  await categoryController.getAllCategories(req, res);
});

export default router;
