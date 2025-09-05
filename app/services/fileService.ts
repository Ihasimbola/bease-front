import { Http } from "./http";

export class FileService extends Http {
  static async upload(url: string, file: any) {
    try {
      const res = await this.post(url, file);
      return res;
    } catch (error) {
      throw error;
    }
  }

  static async uploadProfile(file: any) {
    try {
      const res = await this.post('files/image/profile', file);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}