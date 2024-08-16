export interface ReviewInputDTO {
    userId: string;
    productId: string;
    rating: number;
    description: string;
    title: string;
    isApproved?: boolean;
  }
  
  export interface ReviewDTO extends ReviewInputDTO {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  