import { Http } from "./http";

export class RoleService extends Http {
  static async getRoles() {
    try {
      const res = await this.get('role');
      return res.data;
    } catch (error) {
      throw error;
    }
}
}