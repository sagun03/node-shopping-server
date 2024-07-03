export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string; 
    imageURL: string;
    reviews?: string[];
  }
  
  export interface ProductInputDTO {
    name: string;
    description: string;
    price: number;
    categoryId: string; 
    imageURL: string;
    reviews?: string[];
}