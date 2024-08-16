import express, { Request, Response } from 'express';
import ReviewController from '../controllers/products/review.controller';
import { verifyFirebaseToken } from '../middlewares/auth/firebaseJWT';

const router = express.Router();
const reviewController = ReviewController.getInstance();

// CREATE a new review for a specific product
router.post('/product/:productId', async (req: Request, res: Response) => {
  await reviewController.createReviewByProductId(req, res);
});

// UPDATE an existing review
router.put('/:id', verifyFirebaseToken, async (req: Request, res: Response) => {
  await reviewController.updateReview(req, res);
});

// DELETE a review
router.delete('/:id', verifyFirebaseToken, async (req: Request, res: Response) => {
  await reviewController.deleteReview(req, res);
});

// GET a review by ID
router.get('/:id', async (req: Request, res: Response) => {
  await reviewController.getReviewById(req, res);
});

// GET reviews by productId
router.get('/product/:productId', async (req: Request, res: Response) => {
  await reviewController.getReviewsByProductId(req, res);
});

// GET ALL reviews
router.get('/', async (req: Request, res: Response) => {
  await reviewController.getAllReviews(req, res);
});

export default router;
