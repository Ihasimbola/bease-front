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

  static async create(data: { name: string }) {
    try {
      const res = await this.post("category", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async remove(id: string) {
    try {
      const res = await this.delete(`category/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}