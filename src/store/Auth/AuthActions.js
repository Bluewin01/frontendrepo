import * as types from "./AuthTypes";

export const generateTokenRequest = (payload) => ({
  type: types.GENERATE_TOKEN_REQUEST,
  payload: payload,
});

export const generateTokenRequestFailed = (error) => ({
  type: types.GENERATE_TOKEN_REQUEST_FAILED,
  error,
});

export const verifyTokenRequest = (payload) => ({
  type: types.VERIFY_TOKEN_REQUEST,
  payload: payload,
});

export const verifyTokenRequestSuccess = (otpData) => ({
  type: types.VERIFY_TOKEN_REQUEST_SUCCESS,
  otpData: otpData,
});

export const verifyTokenRequestFailed = (error) => ({
  type: types.VERIFY_TOKEN_REQUEST_FAILED,
  error,
});

export const verifyOTPRequest = (payload) => ({
  type: types.VERIFY_OTP_REQUEST,
  payload: payload,
});

export const verifyOTPRequestSuccess = (jwt) => ({
  type: types.VERIFY_OTP_REQUEST_SUCCESS,
  jwt,
});

export const verifyOTPRequestFailed = (error) => ({
  type: types.VERIFY_OTP_REQUEST_FAILED,
  error,
});

export const signOut = () => ({
  type: types.SIGN_OUT,
});

export const refreshToken = (token) => ({
  type: types.REFRESH_TOKEN,
  token,
});

export const refreshTokenSuccess = (token) => ({
  type: types.REFRESH_TOKEN_SUCCESS,
  jwt: token,
});

export const refreshTokenFailed = (error) => ({
  type: types.REFRESH_TOKEN_FAILED,
  error,
});

export const generateStaffTokenRequest = (payload) => ({
  type: types.GENERATE_STAFF_TOKEN_REQUEST,
  payload: payload,
});

export const generateStaffTokenRequestFailed = (error) => ({
  type: types.GENERATE_STAFF_TOKEN_REQUEST_FAILED,
  error,
});

export const verifyStaffTokenRequest = (payload) => ({
  type: types.VERIFY_STAFF_TOKEN_REQUEST,
  payload: payload,
});

export const verifyStaffTokenRequestSuccess = (jwt) => ({
  type: types.VERIFY_STAFF_TOKEN_REQUEST_SUCCESS,
  jwt,
});

export const verifyStaffTokenRequestFailed = (error) => ({
  type: types.VERIFY_STAFF_TOKEN_REQUEST_FAILED,
  error,
});
