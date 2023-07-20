import {CategoryModel} from "src/lib/models/category.model";
import {ApiError} from "src/lib/errors/ApiError";

class CategoryService {
  async create(payload) {
    const oldCategory = await CategoryModel.exists({
      name: payload.name
    })
    if(oldCategory) throw new ApiError({
      code: 409,
      message: "Category already exists"
    })
    return await CategoryModel.create(payload)
  }
  
  async updateCategory(payload) {
    return await CategoryModel.findOneAndUpdate({
      _id: payload.id
    }, payload.data, {
      new: true
    })
  }
  
  async getCategories() {
    return await CategoryModel.find({});
  }
  
  async getCategory(id) {
    return await CategoryModel.find({
      _id: id
    });
  }
}

export default new CategoryService();