import * as types from "../AuthTypes";
import reducer from "../AuthReducer";

const INITIAL_STATE = {
  jwt: null,
  otpData: null,
  groupName: "",
  error: null,
  loading: false,
  userCode: null,
};

describe("Auth Reducer", () => {
  test("returns userCode, null error, loading is true when GENERATE_TOKEN_REQUEST action is received", () => {
    const payload = { userID: "12345", password: "12345 " };

    const fakeAction = {
      type: types.GENERATE_TOKEN_REQUEST,
      payload,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      userCode: fakeAction.payload.userID,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null error, loading is true when VERIFY_TOKEN_REQUEST action is received", () => {
    const fakeUserID = "12345";
    const fakeEncPassword = "12345";
    const fakeSessionId = "12345";

    const params = {
      loginId: fakeUserID,
      fakeEncPassword,
      fakeSessionId,
    };

    const fakeAction = {
      type: types.VERIFY_TOKEN_REQUEST,
      params,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null error, loading is true when VERIFY_OTP_REQUEST action is received", () => {
    const payload = { fakeUserID: "12345", fakeCode: "12345" };

    const fakeAction = {
      type: types.VERIFY_OTP_REQUEST,
      payload,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns jwt, null error, loading is false when VERIFY_TOKEN_REQUEST_SUCCESS action is received", () => {
    const otpData = {
      otpData: {
        createdAt: "2022-07-28T09:00:34.094Z",
        expireIn: 300,
        id: "62e25032319cae8fe5aed649",
        to: "+6595556220",
        updatedAt: "2022-07-28T09:00:34.094Z",
      },
    };

    const fakeAction = {
      type: types.VERIFY_TOKEN_REQUEST_SUCCESS,
      otpData,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.otpData,
      error: null,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns jwt, null error, loading is false when VERIFY_OTP_REQUEST_SUCCESS action is received", () => {
    const jwt = {
      jwt: {
        expiresIn: "15m",
        refreshToken: "",
        token: "",
        type: "Bearer",
      },
    };

    const fakeAction = {
      type: types.VERIFY_OTP_REQUEST_SUCCESS,
      jwt,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.jwt,
      error: null,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error, loading is false when VERIFY_OTP_REQUEST_FAILED action is received", () => {
    const error = {
      error: {
        errors: [
          { message: '"code" length must be at least 6 characters long' },
        ],
        success: false,
      },
    };

    const fakeAction = {
      type: types.VERIFY_OTP_REQUEST_FAILED,
      error,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.error,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error, loading is false when GENERATE_TOKEN_REQUEST_FAILED action is received", () => {
    const error = {
      error: {
        errors: [
          { message: '"code" length must be at least 6 characters long' },
        ],
        success: false,
      },
    };

    const fakeAction = {
      type: types.GENERATE_TOKEN_REQUEST_FAILED,
      error,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.error,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error, loading is false when VERIFY_TOKEN_REQUEST_FAILED action is received", () => {
    const error = {
      error: {
        errors: [
          { message: '"code" length must be at least 6 characters long' },
        ],
        success: false,
      },
    };

    const fakeAction = {
      type: types.VERIFY_TOKEN_REQUEST_FAILED,
      error,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.error,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null jwt, userCode, otpData, error, groupName, loading is false when SIGN_OUT action is received", () => {
    const fakeAction = {
      type: types.SIGN_OUT,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      jwt: null,
      userCode: null,
      otpData: null,
      error: null,
      loading: false,
      groupName: "",
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null error, loading is true when REFRESH_TOKEN action is received", () => {
    const token = {
      token: "ABLnD+WbxrpjMTpq895T5LHGwmGEEOKf7aFxNZS8vqH2+IMU4iST2LiR",
    };

    const fakeAction = {
      type: types.REFRESH_TOKEN,
      token,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns jwt, null error, loading is true when REFRESH_TOKEN_SUCCESS action is received", () => {
    const token = {
      jwt: {
        expiresIn: "15m",
        refreshToken: "",
        token: "",
        type: "Bearer",
      },
    };

    const fakeAction = {
      type: types.REFRESH_TOKEN_SUCCESS,
      jwt: token,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.jwt,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error, loading is false when REFRESH_TOKEN_FAILED action is received", () => {
    const error = {
      error: {
        errors: [{ message: "" }],
        success: false,
      },
    };

    const fakeAction = {
      type: types.REFRESH_TOKEN_FAILED,
      error,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.error,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns userID, null error, loading is true when GENERATE_STAFF_TOKEN_REQUEST action is received", () => {
    const payload = { userID: "I123456", password: "12345 " };

    const fakeAction = {
      type: types.GENERATE_STAFF_TOKEN_REQUEST,
      payload,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      userCode: fakeAction.payload.userID,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error, loading is false when GENERATE_STAFF_TOKEN_REQUEST_FAILED action is received", () => {
    const error = {
      error: {
        errors: [{ message: "Unable to generate token" }],
        success: false,
      },
    };

    const fakeAction = {
      type: types.GENERATE_STAFF_TOKEN_REQUEST_FAILED,
      error,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.error,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null error, loading is true when VERIFY_STAFF_TOKEN_REQUEST action is received", () => {
    const payload = {
      username: "I123456",
      encPassword:
        "XudgR/hM1WWT55zwZvQwXQsC7/UNpPyAHw8rwVO7Bwo0dS/LIGw3VJlu+fcmRufwaWGJe8ztNZfSOBXXEns",
    };

    const fakeAction = {
      type: types.VERIFY_STAFF_TOKEN_REQUEST,
      payload: payload,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      error: null,
      loading: true,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns jwt, null error, loading is false when VERIFY_STAFF_TOKEN_REQUEST_SUCCESS action is received", () => {
    const jwt = {
      jwt: {
        expiresIn: "15m",
        refreshToken: "",
        token: "",
        type: "Bearer",
      },
    };

    const fakeAction = {
      type: types.VERIFY_STAFF_TOKEN_REQUEST_SUCCESS,
      jwt,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.jwt,
      error: null,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns jwt, null error, loading is false when VERIFY_STAFF_TOKEN_REQUEST_FAILED action is received", () => {
    const error = {
      error: {
        errors: [{ message: "Unable to verify user!" }],
        success: false,
      },
    };

    const fakeAction = {
      type: types.VERIFY_STAFF_TOKEN_REQUEST_FAILED,
      error,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.error,
      loading: false,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("return initial state in default case", () => {
    const fakeAction = "";
    const initialState = INITIAL_STATE;
    const expected = initialState;
    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });
});
