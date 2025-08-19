import axios from "axios";
import { th } from "zod/v4/locales";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(function(config) {
  config.headers.Authorization = localStorage.getItem("token");

  return config;
}, function(error) {
  console.log(error)
})

axiosInstance.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if(error.status === 401) {
    localStorage.clear();
    window.location.href = "/auth/login";
  }
  return Promise.reject(error);
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
      return res.data;
    } catch (error) {
      throw error;
    }

      // const res = axiosInstance.post(url, data)
      // .then((res) => {
      //   console.log(res);
      //   return res
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
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