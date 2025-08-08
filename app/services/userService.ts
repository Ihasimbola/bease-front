import { Http } from "./http";
import type { CreateAdmin } from "./type";

export class UserService extends Http {
  static async login(data: { email: string, password: string }) {
    try {
      const res = await this.post("auth/signin", data);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  static async register(data: CreateAdmin) {
    try {
      const res = await this.post('users/admin', data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}