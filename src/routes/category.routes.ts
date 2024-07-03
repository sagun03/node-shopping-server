import express, { Request, Response } from 'express';
import CategoryController from '../controllers/products/category.controller';
<<<<<<< HEAD
import { verifyToken } from '../middlewares/auth/jwt';
import { validateCategoryPostBody, validateCategoryIdParam } from '../middlewares/product/categoryMiddleware';
import e from 'express';
=======
import { validateCategoryIdParam, validateCategoryPostBody } from '../middlewares/product/categoryMiddleware';

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
const router = express.Router();
const categoryController = CategoryController.getInstance();

/**
<<<<<<< HEAD
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
 router.post('/', verifyToken, validateCategoryPostBody, async (req: Request, res: Response) => {
=======
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
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
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
<<<<<<< HEAD
router.put('/:id', verifyToken, validateCategoryIdParam, async (req: Request, res: Response) => {
=======
router.put('/:id', validateCategoryIdParam, async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
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
<<<<<<< HEAD
router.delete('/:id', verifyToken, validateCategoryIdParam, async (req: Request, res: Response) => {
=======
router.delete('/:id', validateCategoryIdParam, async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
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
<<<<<<< HEAD
router.get('/:id', verifyToken, validateCategoryIdParam, async (req: Request, res: Response) => {
=======
router.get('/:id', validateCategoryIdParam, async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
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
<<<<<<< HEAD
router.get('/', verifyToken, async (req: Request, res: Response) => {
  await categoryController.getAllCategories(req, res);
});

export default router;
=======
router.get('/', async (req: Request, res: Response) => {
  await categoryController.getAllCategories(req, res);
});

export default router;

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
