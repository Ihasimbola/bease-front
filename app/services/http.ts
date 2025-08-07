import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use(function(config) {
  config.headers.Authorization = localStorage.getItem("token");

  return config;
})

export class Http {
  static async get(url: string) {
    try {
      const res = await axiosInstance.get(url);
      return res;
    } catch (error) {
      throw error;
    }
  }

  static async post(url: string, data: any) {
    try {
      const res = await axiosInstance.post(url, data);
      return res;
    } catch (error) {
      throw error;
    }
  }

  static async patch(url: string, data: any) {
    try {
      const res = await axiosInstance.patch(url, data);
      return res;
    } catch (error) {
      throw error;
    }
  }

  static async delete(url: string) {
    try {
      const res = await axiosInstance.delete(url);
      return res;
    } catch (error) {
      throw error;
    }
  }
}