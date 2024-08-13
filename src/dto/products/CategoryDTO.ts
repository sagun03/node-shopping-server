export interface CategoryInputDTO {
  name: string;
  description: string;
  imageURL: string;
  productIds?: string[];
}

export interface CategoryDTO extends CategoryInputDTO {
  id: string;
}
