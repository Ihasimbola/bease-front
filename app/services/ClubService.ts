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

  static async getClub() {
    try {
      const res = await this.get('club');
      return res.data
    } catch (error) {
      throw error;
    }
  }

  static async updateClub(clubId: string, data: { name?: string, emblem?: string }) {
    try {
      const res = await this.patch(`club/${clubId}`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}