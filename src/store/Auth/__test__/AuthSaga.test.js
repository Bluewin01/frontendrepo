import {
  generateAuthToken,
  generateStaffToken,
  verifyAuthToken,
  verifyOTP,
  verifyStaffToken,
} from "../AuthSaga";
import assert from "assert";
import { put, call } from "redux-saga/effects";
import * as ACTIONS from "../AuthActions";
import AuthApis from "../AuthApis";
import ame2eea from "../../../utils/e2ee/ame2eea";
import nodeRSA from "node-rsa";

jest.mock("../../../utils/e2ee/ame2eea");
jest.mock("../AuthApis");

describe("generateAuthToken function", () => {
  test("it generate token successfully", () => {
    const payload = { payload: { userID: "12345", password: "12345" } };
    const generator = generateAuthToken(payload);
    const response = {
      data: {
        data: {
          sessionId: "mockSessionId",
          randNo: "mockRandNo",
          pubKey: "mockPubKey",
        },
        success: true,
      },
    };
    let next = generator.next();
    assert.deepEqual(
      next.value,
      call(AuthApis.generateToken),
      "call generateToken API"
    );
    generator.next(response);
    expect(ame2eea.encryptPinForAM).toHaveBeenCalled();
  });

  test("it failed to generate token", () => {
    const payload = { userID: "12345", password: "12345" };
    const generator = generateAuthToken(payload);
    let next = generator.next();
    assert.deepEqual(
      next.value,
      call(AuthApis.generateToken),
      "call generateToken API"
    );

    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.generateTokenRequestFailed({
          error: new Error("Unable to generate token"),
        })
      ),
      "put generateTokenRequestFailed action"
    );
  });

  test("it failed to generate token with error", () => {
    const payload = { userID: "12345", password: "12345" };
    const fakeError = { response: { data: {} } };
    const generator = generateAuthToken(payload);
    let next = generator.next();
    next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.generateTokenRequestFailed({
          error: fakeError.response.data,
        })
      ),
      "put generateTokenRequestFailed action"
    );
  });
});

describe("verifyAuthToken function", () => {
  test("it verify token successfully", () => {
    const payload = {
      payload: {
        body: {
          loginId: "",
          encPassword: "",
          sessionId: "",
        },
      },
    };
    const generator = verifyAuthToken(payload);
    const response = {
      data: {
        data: {
          otpData: "mockOtpData",
        },
        success: true,
      },
    };
    const { loginId, encPassword, sessionId } = payload.payload.body;
    let next = generator.next();
    assert.deepEqual(
      next.value,
      call(AuthApis.verifyToken, { loginId, encPassword, sessionId }),
      "call verifyToken API"
    );
    next = generator.next(response);
    const { data } = response.data;
    assert.deepEqual(
      next.value,
      put(ACTIONS.verifyTokenRequestSuccess({ otpData: data })),
      "put verifyTokenRequestSuccess action"
    );
  });

  test("it failed to verify token", () => {
    const payload = {
      payload: {
        body: { loginId: "", encPassword: "", sessionId: "" },
      },
    };
    const generator = verifyAuthToken(payload);
    let next = generator.next();
    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.verifyTokenRequestFailed({
          error: new Error("Unable to verify token"),
        })
      ),
      "put verifyTokenRequestFailed action"
    );
  });

  test("it failed to verify token with error", () => {
    const payload = {
      payload: {
        body: { loginId: "", encPassword: "", sessionId: "" },
      },
    };
    const fakeError = { response: { data: {} } };
    const generator = verifyAuthToken(payload);
    let next = generator.next();
    next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.verifyTokenRequestFailed({
          error: fakeError.response.data,
        })
      ),
      "put verifyTokenRequestFailed action"
    );
  });
});

describe("verifyOTP function", () => {
  test("it verify OTP successfully", () => {
    const payload = {
      payload: {
        otpData: "mockOtpData",
      },
    };
    const generator = verifyOTP(payload);
    const response = {
      data: {
        data: {
          jwt: "mockJwt",
        },
        success: true,
      },
    };
    const { otpData } = payload.payload;
    let next = generator.next();
    assert.deepEqual(
      next.value,
      call(AuthApis.verifyOTP, { otpData }),
      "call verifyOTP API"
    );
    next = generator.next(response);
    const { data } = response.data;
    assert.deepEqual(
      next.value,
      put(ACTIONS.verifyOTPRequestSuccess({ jwt: data })),
      "put verifyOTPRequestSuccess action"
    );
  });

  test("it failed to verify OTP", () => {
    const payload = {
      payload: {
        otpData: "mockOtpData",
      },
    };
    const generator = verifyOTP(payload);
    let next = generator.next();
    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.verifyOTPRequestFailed({
          error: new Error("Unable to verify OTP"),
        })
      ),
      "put verifyOTPRequestFailed action"
    );
  });

  test("it failed to verify OTP with error", () => {
    const payload = {
      payload: {
        otpData: "mockOtpData",
      },
    };
    const fakeError = { response: { data: {} } };
    const generator = verifyOTP(payload);
    let next = generator.next();
    next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.verifyOTPRequestFailed({
          error: fakeError.response.data,
        })
      ),
      "put verifyOTPRequestFailed action"
    );
  });
});

describe("generateStaffToken function", () => {
  test("it generate staff token successfully", () => {
    const payload = {
      payload: {
        userID: "mockUserID",
        password: "mockPassword",
      },
    };
    const generator = generateStaffToken(payload);
    const response = {
      data: {
        data: {
          pubKey:
            "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCM0hH9hidcjMaYABGnNRgoBc7koQZDkb3c9DB842TjyclVRlGJ6zdkOYfmI8WzC6YSefF9Z+HmYBNJD+PaZ5t777fW2d2EsxVHm7boDZsjjbPv8zdbukbBoGuBluzC90FH5kYnBKcO5tZWDJPPDsfvi6LRHz+OW6ghB6jIAlC0uQIDAQAB-----END PUBLIC KEY-----",
        },
        success: true,
      },
    };
    const { password } = payload.payload;
    let next = generator.next();
    assert.deepEqual(
      next.value,
      call(AuthApis.generateStaffToken),
      "call generateStaffToken API"
    );
    next = generator.next(response);
    const { pubKey } = response.data.data;
    const publicKey = nodeRSA(pubKey);
    const encPassword = publicKey.encrypt(password, "base64");
    expect(encPassword).toBeDefined();
  });

  test("it failed to generate staff token", () => {
    const payload = {
      payload: {
        userID: "mockUserID",
        password: "mockPassword",
      },
    };
    const generator = generateStaffToken(payload);
    let next = generator.next();
    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.generateStaffTokenRequestFailed({
          error: new Error("Unable to generate token"),
        })
      ),
      "put generateStaffTokenRequestFailed action"
    );
  });

  test("it failed to generate staff token with error", () => {
    const payload = {
      payload: {
        userID: "mockUserID",
        password: "mockPassword",
      },
    };
    const fakeError = { response: { data: {} } };
    const generator = generateStaffToken(payload);
    let next = generator.next();
    next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.generateStaffTokenRequestFailed({
          error: fakeError.response.data,
        })
      ),
      "put generateStaffTokenRequestFailed action"
    );
  });
});

describe("verifyStaffToken function", () => {
  test("it verify staff token successfully", () => {
    const payload = {
      payload: {
        body: { loginId: "", encPassword: "" },
      },
    };
    const generator = verifyStaffToken(payload);
    const response = {
      data: {
        data: {
          jwt: "mockJwt",
        },
        success: true,
      },
    };
    const { loginId, encPassword } = payload.payload.body;
    let next = generator.next();
    assert.deepEqual(
      next.value,
      call(AuthApis.verifyStaff, { username: loginId, encPassword }),
      "call verifyStaff API"
    );
    next = generator.next(response);
    const { data } = response.data;
    assert.deepEqual(
      next.value,
      put(ACTIONS.verifyStaffTokenRequestSuccess({ jwt: data })),
      "put verifyStaffTokenRequestSuccess action"
    );
  });

  test("it failed to verify staff token", () => {
    const payload = {
      payload: {
        body: { loginId: "", encPassword: "" },
      },
    };
    const response = { message: "Unable to verify token" };
    const generator = verifyStaffToken(payload);
    let next = generator.next();
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.verifyStaffTokenRequestFailed({
          error: new Error(response.message),
        })
      ),
      "put verifyStaffTokenRequestFailed action"
    );
  });

  test("it failed to verify staff token with error", () => {
    const payload = {
      payload: {
        body: { loginId: "", encPassword: "" },
      },
    };
    const fakeError = { response: { data: {} } };
    const generator = verifyStaffToken(payload);
    let next = generator.next();
    next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.verifyStaffTokenRequestFailed({
          error: fakeError.response.data,
        })
      ),
      "put verifyStaffTokenRequestFailed action"
    );
  });
});
