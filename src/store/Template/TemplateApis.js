import axios from "axios";
import { axiosInstance } from "../../network/apis";
import AuthAPI from "../../store/Auth/AuthApis";

const handlerEnabled = false;

const templateApis = async (url, payload, refreshedToken) => {
  try {
    const apiResponse = await axiosInstance.post(url, payload, {
      handlerEnabled,
    });
    return { newToken: null, apiResponse };
  } catch (error) {
    const { message } = error.response.data;
    if (message === "jwt expired") {
      const request = error.config;
      const newToken = await AuthAPI.refreshToken({ token: refreshedToken });
      const { token } = newToken.data.data;
      request.headers.Authorization = `Bearer ${token}`;
      const apiResponse = await axios(request);
      const response = {
        newToken,
        apiResponse,
      };
      return response;
    }
    throw error;
  }
};

const getTemplateApis = async (url, payload, refreshedToken) => {
  try {
    const { type, templateId } = payload;
    let apiResponse = "";
    if (type !== undefined) {
      apiResponse = await axiosInstance.get(`${url}/${type}`, {
        handlerEnabled,
      });
    } else {
      apiResponse = await axiosInstance.get(`${url}/${templateId}`, {
        handlerEnabled,
      });
    }
    return { newToken: null, apiResponse };
  } catch (error) {
    if (error.hasOwnProperty("response") && error.response !== undefined) {
      const { message } = error.response.data;
      if (message === "jwt expired") {
        const request = error.config;
        const newToken = await AuthAPI.refreshToken({ token: refreshedToken });
        const { token } = newToken.data.data;
        request.headers.Authorization = `Bearer ${token}`;
        const apiResponse = await axios(request);
        const response = {
          newToken,
          apiResponse,
        };
        return response;
      }
      throw error;
    }
  }
};

const putTemplateApis = async (url, payload, refreshedToken) => {
  try {
    const apiResponse = await axiosInstance.put(url, payload, {
      handlerEnabled,
    });
    return { newToken: null, apiResponse };
  } catch (error) {
    const { message } = error.response.data;
    if (message === "jwt expired") {
      const request = error.config;
      const newToken = await AuthAPI.refreshToken({ token: refreshedToken });
      const { token } = newToken.data.data;
      request.headers.Authorization = `Bearer ${token}`;
      const apiResponse = await axios(request);
      const response = {
        newToken,
        apiResponse,
      };
      return response;
    }
    throw error;
  }
};

const deleteTemplateApis = async (url, payload, refreshedToken) => {
  try {
    const { id, type } = payload;
    const apiResponse = await axiosInstance.delete(`${url}/${id}/${type}`, {
      handlerEnabled,
    });
    return { newToken: null, apiResponse };
  } catch (error) {
    if (error.hasOwnProperty("response") && error.response !== undefined) {
      const { message } = error.response.data;
      if (message === "jwt expired") {
        const request = error.config;
        const newToken = await AuthAPI.refreshToken({ token: refreshedToken });
        const { token } = newToken.data.data;
        request.headers.Authorization = `Bearer ${token}`;
        const apiResponse = await axios(request);
        const response = {
          newToken,
          apiResponse,
        };
        return response;
      }
      throw error;
    }
  }
};

export default {
  templateApis,
  getTemplateApis,
  putTemplateApis,
  deleteTemplateApis,
};
