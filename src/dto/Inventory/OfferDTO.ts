export interface OfferDTO {
    id: string;
    offerID: string;
    code: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    location?: string;
  }
  
  export interface OfferInputDTO {
    offerID: string;
    code: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    location?: string;
  }
  