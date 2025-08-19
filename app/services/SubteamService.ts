import { Http } from "./http";

export class SubteamService extends Http {
  static async addSubteam(clubId: string, data: { name: string }) {
    try {
      const res = await this.post(`category/create-custom`, data );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubteam(clubId: string, subteam: string) {
    try {
      const res = await this.delete(`category`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}