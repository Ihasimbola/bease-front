import { Http } from "./http";

export class PostService extends Http {
  static async getPostNames() {
    try {
      const res = await this.get("post-name");
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async AssignPost(data: any)  {
    try {
      const res = await this.post("post", data)  ;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(id: string) {
    try {
      const res = await this.delete('post/' + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}