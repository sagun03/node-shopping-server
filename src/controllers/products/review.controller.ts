import { Request, Response } from "express";
import ReviewService from "../../services/products/ReviewService";
import { ReviewDTO, ReviewInputDTO } from "../../dto/products/reviewDTO";

class ReviewController {
  private static instance: ReviewController;
  private reviewService: ReviewService;

  private constructor() {
    this.reviewService = new ReviewService();
  }

  static getInstance(): ReviewController {
    if (!ReviewController.instance) {
      ReviewController.instance = new ReviewController();
    }
    return ReviewController.instance;
  }

  // CREATE a new review
  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewInput: ReviewInputDTO = req.body;
      const createdReview: ReviewDTO = await this.reviewService.createReview(reviewInput);
      res.status(201).json(createdReview);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create review", error: error.message });
    }
  }

  // UPDATE an existing review
  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewId: string = req.params.id;
      const reviewInput: ReviewInputDTO = req.body;
      const updatedReview: ReviewDTO | null = await this.reviewService.updateReview(reviewId, reviewInput);
      if (updatedReview) {
        res.status(200).json(updatedReview);
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update review", error: error.message });
    }
  }

  // DELETE a review
  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewId: string = req.params.id;
      await this.reviewService.deleteReview(reviewId);
      res.status(200).json({ message: "Review has been deleted" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete review", error: error.message });
    }
  }

  // GET a review by ID
  async getReviewById(req: Request, res: Response): Promise<void> {
    try {
      const reviewId: string = req.params.id;
      const review: ReviewDTO | null = await this.reviewService.getReviewById(reviewId);
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get review", error: error.message });
    }
  }

  // GET ALL reviews
  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews: ReviewDTO[] = await this.reviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get reviews", error: error.message });
    }
  }
}

export default ReviewController;
