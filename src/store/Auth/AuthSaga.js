import { call, put, takeLatest } from "redux-saga/effects";
import API from "./AuthApis";
import * as ACTIONS from "./AuthActions";
import * as TYPES from "./AuthTypes";
import { ame2eea } from "../../utils/e2ee/ame2eea";
import nodeRSA from "node-rsa";

export function* generateAuthToken(payload) {
  try {
    const response = yield call(API.generateToken);
    if (response && response.data && response.data.success) {
      const { data } = response.data;
      const oaepHashAlgo = "SHA-256";
      const { pubKey, randNo, sessionId } = data;
      const {
        payload: { userID, password },
      } = payload;
      const encPassword = ame2eea.encryptPinForAM(
        sessionId,
        pubKey,
        randNo,
        password,
        oaepHashAlgo
      );

      const params = {
        loginId: userID,
        encPassword,
        sessionId,
      };
      yield put(ACTIONS.verifyTokenRequest(params));
    } else {
      yield put(
        ACTIONS.generateTokenRequestFailed({
          error: new Error("Unable to generate token"),
        })
      );
    }
  } catch (err) {
    const { response } = err;
    const { data } = response;
    yield put(ACTIONS.generateTokenRequestFailed({ error: data }));
  }
}

export function* verifyAuthToken(payload) {
  try {
    const { payload: body } = payload;
    const { loginId = "", encPassword = "", sessionId = "" } = body;
    const response = yield call(API.verifyToken, {
      loginId,
      encPassword,
      sessionId,
    });

    if (response && response.data && response.data.success) {
      const { data } = response.data;

      yield put(
        ACTIONS.verifyTokenRequestSuccess({
          otpData: data,
        })
      );
    } else {
      yield put(
        ACTIONS.verifyTokenRequestFailed({
          error: new Error("Unable to verify token"),
        })
      );
    }
  } catch (err) {
    const { response } = err;
    const { data } = response;
    yield put(ACTIONS.verifyTokenRequestFailed({ error: data }));
  }
}

export function* verifyOTP(payload) {
  try {
    const { payload: otpData } = payload;
    const response = yield call(API.verifyOTP, otpData);

    if (response && response.data && response.data.success) {
      const { data } = response.data;
      yield put(ACTIONS.verifyOTPRequestSuccess({ jwt: data }));
    } else {
      yield put(
        ACTIONS.verifyOTPRequestFailed({
          error: new Error("Unable to verify OTP"),
        })
      );
    }
  } catch (err) {
    const { response } = err;
    const { data } = response;
    yield put(ACTIONS.verifyOTPRequestFailed({ error: data }));
  }
}

export function* generateStaffToken(payload) {
  try {
    const response = yield call(API.generateStaffToken);
    if (response && response.data && response.data.success) {
      const { data } = response.data;
      const { pubKey } = data;
      const {
        payload: { userID, password },
      } = payload;

      const publicKey = nodeRSA(pubKey);
      const encPassword = publicKey.encrypt(password, "base64");

      const params = {
        loginId: userID,
        encPassword: encPassword,
      };
      yield put(ACTIONS.verifyStaffTokenRequest(params));
    } else {
      yield put(
        ACTIONS.generateStaffTokenRequestFailed({
          error: new Error("Unable to generate token"),
        })
      );
    }
  } catch (err) {
    const { response } = err;
    const { data } = response;
    yield put(ACTIONS.generateStaffTokenRequestFailed({ error: data }));
  }
}

export function* verifyStaffToken(payload) {
  try {
    const { payload: body } = payload;
    const { loginId = "", encPassword = "" } = body;
    const response = yield call(API.verifyStaff, {
      username: loginId,
      encPassword,
    });

    if (response && response.data && response.data.success) {
      const { data } = response.data;
      yield put(ACTIONS.verifyStaffTokenRequestSuccess({ jwt: data }));
    } else {
      yield put(
        ACTIONS.verifyStaffTokenRequestFailed({
          error: new Error("Unable to verify token"),
        })
      );
    }
  } catch (err) {
    const { response } = err;
    const { data } = response;
    yield put(ACTIONS.verifyStaffTokenRequestFailed({ error: data }));
  }
}

export function* AuthSaga() {
  yield takeLatest(TYPES.GENERATE_TOKEN_REQUEST, generateAuthToken);
  yield takeLatest(TYPES.VERIFY_TOKEN_REQUEST, verifyAuthToken);
  yield takeLatest(TYPES.VERIFY_OTP_REQUEST, verifyOTP);
  yield takeLatest(TYPES.GENERATE_STAFF_TOKEN_REQUEST, generateStaffToken);
  yield takeLatest(TYPES.VERIFY_STAFF_TOKEN_REQUEST, verifyStaffToken);
}
