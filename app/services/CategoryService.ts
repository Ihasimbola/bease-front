import { Http } from "./http";

export class CategoryService extends Http {
  static async getCategories() {
    try {
      const res = await this.get('category');
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}