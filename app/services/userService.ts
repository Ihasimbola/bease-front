import type { AxiosResponse } from "axios";
import { Http } from "./http";
import type { CreateAdmin, HttpResponse } from "./type";

export type LicensedResponse = {
  _id: string;
  user: {
    firstname: string;
    lastname: string;
    _id: string;
    email: string;
    profile: string;
    role: string;
  },
  phone: string;
  age: number;
  isConfirmed: boolean;
  gender: string;
  category: {
    _id: string;
    name: string;
  }
}

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

  static async getAdmin(id: string) {
    try {
      const res = await this.get('users/admin/' + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getLicensedByClub(clubId: string) {
    try {
      const res = await this.get<LicensedResponse[]>('users/licensed/' + clubId,);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}