import express, { Request, Response } from 'express';
import CategoryController from '../controllers/products/category.controller';
import { validateCategoryIdParam, validateCategoryPostBody } from '../middlewares/product/categoryMiddleware';

const router = express.Router();
const categoryController = CategoryController.getInstance();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Categories related API(s)
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInputDTO'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDTO'
 *       400:
 *         description: Invalid request body
 */
router.post('/', validateCategoryPostBody, async (req: Request, res: Response) => {
  await categoryController.createCategory(req, res);
});

/**
 * @swagger
 * /categories:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInputDTO'
 *     responses:
 *       200:
 *         description: The category was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDTO'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Category not found
 */
router.put('/:id', validateCategoryIdParam, async (req: Request, res: Response) => {
  await categoryController.updateCategory(req, res);
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category was successfully deleted
 *       404:
 *         description: Category not found
 */
router.delete('/:id', validateCategoryIdParam, async (req: Request, res: Response) => {
  await categoryController.deleteCategory(req, res);
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category was successfully found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDTO'
 *       404:
 *         description: Category not found
 */
router.get('/:id', validateCategoryIdParam, async (req: Request, res: Response) => {
  await categoryController.getCategoryById(req, res);
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The categories were successfully found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryDTO'
 */
router.get('/', async (req: Request, res: Response) => {
  await categoryController.getAllCategories(req, res);
});

export default router;

