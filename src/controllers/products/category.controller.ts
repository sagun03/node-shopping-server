import { Request, Response } from "express";
import CategoryService from "../../services/products/CategoryService";
import { CategoryDTO, CategoryInputDTO } from "../../dto/products/CategoryDTO";
import { uploadImageToBlob } from '../../services/productandcategoryazureBlobService';

class CategoryController {
  private static instance: CategoryController;
  private categoryService: CategoryService;

  private constructor() {
    this.categoryService = new CategoryService();
  }

  static getInstance(): CategoryController {
    if (!CategoryController.instance) {
      CategoryController.instance = new CategoryController();
    }
    return CategoryController.instance;
  }

  // CREATE a new category
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryInput: CategoryInputDTO = req.body;
      
      if (req.file) {
        const imageURL = await uploadImageToBlob(req.file);
        categoryInput.imageURL = imageURL;
      }

      const createdCategory: CategoryDTO = await this.categoryService.createCategory(categoryInput);
      res.status(201).json(createdCategory);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create category", error: error.message });
    }
  }

  // UPDATE an existing category
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId: string = req.params.id;
      const categoryInput: CategoryInputDTO = req.body;
      
      if (req.file) {
        const imageUrl = await uploadImageToBlob(req.file);
        categoryInput.imageURL = imageUrl;
      }

      const updatedCategory: CategoryDTO | null = await this.categoryService.updateCategory(categoryId, categoryInput);
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update category", error: error.message });
    }
  }

  // DELETE a category
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId: string = req.params.id;
      await this.categoryService.deleteCategory(categoryId);
      res.status(200).json({ message: "Category has been deleted" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
  }

  // GET a category by ID
  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const categoryId: string = req.params.id;
      const category: CategoryDTO | null = await this.categoryService.getCategoryById(categoryId);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get category", error: error.message });
    }
  }

  // GET ALL categories
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories: CategoryDTO[] = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get categories", error: error.message });
    }
  }
}

export default CategoryController;
