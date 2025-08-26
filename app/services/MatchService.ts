import { Http } from "./http";

export class MatchService extends Http {
  static async getMatchByClub() {
    try {
      const res = await this.get("match");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}