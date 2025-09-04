import { Http } from "./http";

type CreateMatchType = {
  clubId: string;
  divistion: string;
  teamA: string;
  teamB: string;
  matchDate: Date;
  startTime: string;
  place: string;
}

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

  static async getMatchById(id: string) {
    try {
      const res = await this.get("match/" + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async createMatch(data: CreateMatchType) {
    try {
      const res = await this.post('match', data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async sendAssignForMatchFromInvitation(data: { matchId: string, categoryId: string }) {
    try {
      const res = await this.post(`match/assign-invitation`, data);
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