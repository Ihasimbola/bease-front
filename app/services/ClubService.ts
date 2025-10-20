import { Http } from "./http";
import type { ClubResponse, CreateClub } from "./type";


export class ClubService extends Http {
  static async createClub(data: CreateClub) {
    try {
      const res = await this.post('club', data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getClub(id?: string) {
    try {
      if(id) {
        const res = (await this.get('club/' + id));
        return res.data;
      }
      const res = await this.get('club');
      return res.data
    } catch (error) {
      throw error;
    }
  }

  static async getAllClubs() {
    try {
      const res = await this.get('club/all');
      return res.data;
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

  static async updateSubnames(clubId: string, subnames: string[]) {
    try {
      const res = await this.patch(`club/${clubId}`, { subnames });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}