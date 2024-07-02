import express, { Request, Response } from 'express';
import CategoryController from '../controllers/products/category.controller';
import { verifyToken } from '../middlewares/auth/jwt';

const router = express.Router();
const categoryController = CategoryController.getInstance();

// CREATE a new category
router.post('/', verifyToken, async (req: Request, res: Response) => {
  await categoryController.createCategory(req, res);
});

// UPDATE an existing category
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  await categoryController.updateCategory(req, res);
});

// DELETE a category
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  await categoryController.deleteCategory(req, res);
});

// GET a category by ID
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  await categoryController.getCategoryById(req, res);
});

// GET ALL categories
router.get('/', verifyToken, async (req: Request, res: Response) => {
  await categoryController.getAllCategories(req, res);
});

export default router;

