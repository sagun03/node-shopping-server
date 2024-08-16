import { Request, Response } from "express";
import ProductService from "../../services/products/ProductService";
import { ProductDTO, ProductInputDTO } from "../../dto/products/ProductDTO";
// import { uploadImageToBlob } from "../../services/productandcategoryazureBlobService";

class ProductController {
  private static instance: ProductController;
  private productService: ProductService;

  private constructor() {
    this.productService = new ProductService();
  }

  static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }

  // CREATE a new product
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productInput: ProductInputDTO = req.body;
      // need rework when admin pannel is read
      // if (req.files && Array.isArray(req.files)) {
      //   const sizeImageMap: { [key: string]: string[] } = {};

      //   // Group files by size using the fieldname
      //   req.files.forEach((file: any) => {
      //     const sizeKey = file.fieldname.split('_')[1]; // Extract size from fieldname
      //     if (!sizeImageMap[sizeKey]) {
      //       sizeImageMap[sizeKey] = [];
      //     }
      //     sizeImageMap[sizeKey].push(file);
      //   });

      //   // Assign uploaded images to corresponding sizes
      //   for (const size of productInput.sizes) {
      //     if (sizeImageMap[size.size]) {
      //       const uploadedImages = await Promise.all(sizeImageMap[size.size].map(async (file: any) => {
      //         return await uploadImageToBlob(file);
      //       }));
      //       size.images = uploadedImages;
      //     }
      //   }
      // }

      const createdProduct: ProductDTO =
        await this.productService.createProduct(productInput);
      res.status(201).json(createdProduct);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to create product", error: error.message });
    }
  }

  // UPDATE an existing product
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId: string = req.params.id;
      const productInput: ProductInputDTO = req.body;

      // need rework when admin pannel is read
      // if (req.files && Array.isArray(req.files)) {
      //   for (const size of productInput.sizes) {
      //     const uploadedImages = await Promise.all(req.files.map(async (file) => {
      //       return await uploadImageToBlob(file);
      //     }));
      //     size.images = uploadedImages;
      //   }
      // }
      const updatedProduct: ProductDTO | null =
        await this.productService.updateProduct(productId, productInput);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to update product", error: error.message });
    }
  }

  // DELETE a product
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId: string = req.params.id;
      await this.productService.deleteProduct(productId);
      res.status(200).json({ message: "Product has been deleted" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to delete product", error: error.message });
    }
  }

  // GET a product by ID
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId: string = req.params.id;
      const product: ProductDTO | null =
        await this.productService.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to get product", error: error.message });
    }
  }

  // GET ALL products
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: ProductDTO[] = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to get products", error: error.message });
    }
  }

  // GET similar products
  async getSimilarProducts(req: Request, res: Response): Promise<void> {
    try {
      const productId: string = req.params.productId;
      const product: ProductDTO | null =
        await this.productService.getProductById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return; // Return to ensure no further code is executed after sending the response
      }

      const similarProducts: ProductDTO[] =
        await this.productService.getSimilarProducts(
          product.category,
          productId,
        );
      res.status(200).json(similarProducts);
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to get similar products",
        error: error.message,
      });
    }
  }
}

export default ProductController;
