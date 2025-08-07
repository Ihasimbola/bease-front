import { Http } from "./http";

export class UserService extends Http {
  static async login(data: { email: string, password: string }) {
    try {
      const res = await this.post("auth/signin", data);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }
}