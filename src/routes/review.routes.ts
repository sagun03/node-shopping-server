import express, { Request, Response } from 'express';
import ReviewController from '../controllers/products/review.controller';

const router = express.Router();
const reviewController = ReviewController.getInstance();

// CREATE a new review
router.post('/', async (req: Request, res: Response) => {
  await reviewController.createReview(req, res);
});

// UPDATE an existing review
router.put('/:id', async (req: Request, res: Response) => {
  await reviewController.updateReview(req, res);
});

// DELETE a review
router.delete('/:id', async (req: Request, res: Response) => {
  await reviewController.deleteReview(req, res);
});

// GET a review by ID
router.get('/:id', async (req: Request, res: Response) => {
  await reviewController.getReviewById(req, res);
});

// GET ALL reviews
router.get('/', async (req: Request, res: Response) => {
  await reviewController.getAllReviews(req, res);
});

export default router;
