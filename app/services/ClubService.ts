import { Http } from "./http";
import type { CreateClub } from "./type";


export class ClubService extends Http {
  static async createClub(data: CreateClub) {
    try {
      const res = await this.post('club', data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}