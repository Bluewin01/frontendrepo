import { axiosInstance } from "../../network/apis";
const handlerEnabled = false;

const generateToken = async () => {
  return await axiosInstance.post(`auth/startSession`, { handlerEnabled });
};

const verifyToken = async (payload) => {
  return await axiosInstance.post(`auth/verifyAgent`, payload, {
    handlerEnabled,
  });
};

const verifyOTP = async (payload) => {
  return await axiosInstance.post(`auth/verifyOtp`, payload, {
    handlerEnabled,
  });
};

const generateStaffToken = async (payload) => {
  return await axiosInstance.post(`auth/getToken`, payload, {
    handlerEnabled,
  });
};

const verifyStaff = async (payload) => {
  return await axiosInstance.post(`auth/verifyStaff`, payload, {
    handlerEnabled,
  });
};

const refreshToken = async (payload) => {
  return await axiosInstance.post(`auth/refreshToken`, payload, {
    handlerEnabled,
  });
};

export default {
  generateToken,
  verifyToken,
  verifyOTP,
  generateStaffToken,
  verifyStaff,
  refreshToken,
};
