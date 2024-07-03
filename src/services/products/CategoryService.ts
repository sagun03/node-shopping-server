import { CategoryDTO, CategoryInputDTO } from "../../dto/products/CategoryDTO";
import { Category } from "../../models/mongodb/products.model";

class CategoryService {
  async createCategory(categoryInput: CategoryInputDTO): Promise<CategoryDTO> {
    const category = new Category(categoryInput);
    await category.save();
    return category.toObject() as CategoryDTO;
  }

  async updateCategory(categoryId: string, categoryInput: CategoryInputDTO): Promise<CategoryDTO | null> {
    const category = await Category.findByIdAndUpdate(categoryId, categoryInput, { new: true });
    return category ? (category.toObject() as CategoryDTO) : null;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await Category.findByIdAndDelete(categoryId);
  }

  async getCategoryById(categoryId: string): Promise<CategoryDTO | null> {
    const category = await Category.findById(categoryId);
    return category ? (category.toObject() as CategoryDTO) : null;
  }

  async getAllCategories(): Promise<CategoryDTO[]> {
    const categories = await Category.find();
    return categories.map(category => category.toObject() as CategoryDTO);
  }
}

export default CategoryService;
