import type { AxiosResponse } from "axios";
import { Http } from "./http";
import type { CreateAdmin, CreateLicensed, HttpResponse } from "./type";

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

  static async registerLicensed(data: CreateLicensed) {
    try {
      const res = await this.post('users/add-licensed', data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLicensed(id: string | number) {
    try {
      const res = await this.delete('users/licensed/' + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateLicensed(id: string, data: any) {
    try {
      const res = await this.patch('users/licensed/' + id, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateAdmin(id: string, data: any) {
    try {
      const res = await this.patch('users/admin/' + id, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id: string, data: any) {
    try {
      const res = await this.patch('users/' + id, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(userId: string, newPassword: string) {
    try {
      const res = await this.patch('users/reset-password', { userId, password: newPassword });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async confirmLicensed(key: string) {
    try {
      const response = await this.post('mailing/confirm?key=' + key, {});
      return new Promise((res, rej) => {
        setTimeout(() => {
          return res({});
        }, 2000);
      });
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

  static async getLicensed(id: string) {
    try {
      const res = await this.get("users/licensed/" + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getLicensedByClub(clubId: string, search?: string) {
    try {
      if(search) {
        const res = await this.get<LicensedResponse[]>('users/licensed-club/' + clubId + `?search=${search}`);
        return res.data;
      }

      const res = await this.get<LicensedResponse[]>('users/licensed-club/' + clubId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserProfile(id: string) {
    try {
      const res = await this.get('users/' + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async verifyChangePassKey(key: string) {
    try {
      const res = await this.get('auth/verify-change-pass-access-key?key=' + key);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

}