import { ReviewDTO, ReviewInputDTO } from "../../dto/products/reviewDTO";
import { Review } from "../../models/mongodb/products.model";

class ReviewService {
  async createReview(reviewInput: ReviewInputDTO): Promise<ReviewDTO> {
    const review = new Review(reviewInput);
    await review.save();
    return review.toObject() as ReviewDTO;
  }

  async updateReview(
    reviewId: string,
    reviewInput: ReviewInputDTO,
  ): Promise<ReviewDTO | null> {
    const review = await Review.findByIdAndUpdate(reviewId, reviewInput, {
      new: true,
    });
    return review ? (review.toObject() as ReviewDTO) : null;
  }

  async deleteReview(reviewId: string): Promise<void> {
    await Review.findByIdAndDelete(reviewId);
  }

  async getReviewById(reviewId: string): Promise<ReviewDTO | null> {
    const review = await Review.findById(reviewId);
    return review ? (review.toObject() as ReviewDTO) : null;
  }

  async getAllReviews(): Promise<ReviewDTO[]> {
    const reviews = await Review.find();
    return reviews.map((review) => review.toObject() as ReviewDTO);
  }
}

export default ReviewService;
