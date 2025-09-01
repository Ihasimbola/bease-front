import { Http } from "./http";

export class MatchService extends Http {
  static async getMatchByClub(skipValue?: number, limitValue?: number) {
    skipValue = skipValue || 0;
    try {
      const res = await this.get("match?skip=" + skipValue + "&limit=" + limitValue);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMatch(matchId: string) {
    try {
      const res = await this.delete("match/" + matchId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}