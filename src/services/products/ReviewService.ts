import { ReviewDTO, ReviewInputDTO } from "../../dto/products/reviewDTO";
import { Review } from "../../models/mongodb/products.model";

class ReviewService {
  // CREATE a new review
  async createReview(reviewInput: ReviewInputDTO): Promise<ReviewDTO> {
    const review = new Review(reviewInput);
    await review.save();
    return review.toObject() as ReviewDTO;
  }

  // UPDATE an existing review
  async updateReview(reviewId: string, reviewInput: ReviewInputDTO): Promise<ReviewDTO | null> {
    const review = await Review.findByIdAndUpdate(reviewId, reviewInput, { new: true });
    return review ? (review.toObject() as ReviewDTO) : null;
  }

  // DELETE a review
  async deleteReview(reviewId: string): Promise<void> {
    await Review.findByIdAndDelete(reviewId);
  }

  // GET a review by ID
  async getReviewById(reviewId: string): Promise<ReviewDTO | null> {
    const review = await Review.findById(reviewId);
    return review ? (review.toObject() as ReviewDTO) : null;
  }

  // GET ALL reviews
  async getAllReviews(): Promise<ReviewDTO[]> {
    const reviews = await Review.find();
    return reviews.map(review => review.toObject() as ReviewDTO);
  }

  // GET reviews by productId
  async getReviewsByProductId(productId: string): Promise<ReviewDTO[]> {
    const reviews = await Review.find({ productId });
    return reviews.map(review => review.toObject() as ReviewDTO);
  }
}

export default ReviewService;
