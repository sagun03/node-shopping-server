import express, { Request, Response } from 'express';
import ReviewController from '../controllers/products/review.controller';
<<<<<<< HEAD
import { verifyToken } from '../middlewares/auth/jwt';
=======
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = express.Router();
const reviewController = ReviewController.getInstance();

// CREATE a new review
<<<<<<< HEAD
router.post('/', verifyToken, async (req: Request, res: Response) => {
=======
router.post('/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await reviewController.createReview(req, res);
});

// UPDATE an existing review
<<<<<<< HEAD
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.put('/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await reviewController.updateReview(req, res);
});

// DELETE a review
<<<<<<< HEAD
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.delete('/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await reviewController.deleteReview(req, res);
});

// GET a review by ID
<<<<<<< HEAD
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/:id', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await reviewController.getReviewById(req, res);
});

// GET ALL reviews
<<<<<<< HEAD
router.get('/', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await reviewController.getAllReviews(req, res);
});

export default router;
