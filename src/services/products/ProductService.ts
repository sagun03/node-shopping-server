import { ProductDTO, ProductInputDTO } from "../../dto/products/ProductDTO";
import { Product } from '../../models/mongodb/product.model';

class ProductService {
  constructor() {}

  // CREATE a new product
  public async createProduct(productInput: ProductInputDTO): Promise<ProductDTO> {
    const newProduct = new Product(productInput);
    const savedProduct = await newProduct.save();
    return this.mapProductToDTO(savedProduct);
  }

  // UPDATE an existing product
  public async updateProduct(productId: string, productInput: ProductInputDTO): Promise<ProductDTO | null> {
    const updatedProduct = await Product.findByIdAndUpdate(productId, productInput, { new: true });
    return updatedProduct ? this.mapProductToDTO(updatedProduct) : null;
  }

  // DELETE a product
  public async deleteProduct(productId: string): Promise<void> {
    await Product.findByIdAndDelete(productId);
  }

  // GET a product by ID
  public async getProductById(productId: string): Promise<ProductDTO | null> {
    const product = await Product.findById(productId);
    return product ? this.mapProductToDTO(product) : null;
  }

  // GET ALL products
  public async getAllProducts(): Promise<ProductDTO[]> {
    const products = await Product.find();
    return products.map(this.mapProductToDTO);
  }

  // Utility function to map Product model to ProductDTO
  private mapProductToDTO(product: any): ProductDTO {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageURL: product.imageURL
    };
  }
}

export default ProductService;
