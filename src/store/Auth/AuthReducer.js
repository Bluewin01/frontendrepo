import * as types from "./AuthTypes";

const INITIAL_STATE = {
  jwt: null,
  otpData: null,
  groupName: "",
  error: null,
  loading: false,
  userCode: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GENERATE_TOKEN_REQUEST: {
      return {
        ...state,
        userCode: action.payload.userID,
        error: null,
        loading: true,
      };
    }
    case types.VERIFY_TOKEN_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.VERIFY_OTP_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.VERIFY_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.otpData,
        error: null,
        loading: false,
      };
    }
    case types.VERIFY_OTP_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.jwt,
        error: null,
        loading: false,
      };
    }
    case types.VERIFY_OTP_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.GENERATE_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.VERIFY_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.SIGN_OUT: {
      return {
        ...state,
        jwt: null,
        userCode: null,
        otpData: null,
        error: null,
        loading: false,
        groupName: "",
      };
    }
    case types.REFRESH_TOKEN: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.jwt,
        error: null,
        loading: true,
      };
    }
    case types.REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.GENERATE_STAFF_TOKEN_REQUEST: {
      return {
        ...state,
        userCode: action.payload.userID,
        error: null,
        loading: true,
      };
    }
    case types.GENERATE_STAFF_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.VERIFY_STAFF_TOKEN_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.VERIFY_STAFF_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.jwt,
        error: null,
        loading: false,
      };
    }
    case types.VERIFY_STAFF_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
