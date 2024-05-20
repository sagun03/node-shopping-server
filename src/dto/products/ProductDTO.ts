export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageURL: string;
  }
  
  export interface ProductInputDTO {
    name: string;
    description: string;
    price: number;
    category: string;
    imageURL: string;
  }