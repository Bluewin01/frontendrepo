const AuthActions = require("../AuthActions");

// @ponicode
describe("AuthActions.generateTokenRequest", () => {
  test("generateTokenRequest", () => {
    let result = AuthActions.generateTokenRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "GENERATE_TOKEN_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("AuthActions.generateTokenRequestFailed", () => {
  test("generateTokenRequestFailed", () => {
    let result = AuthActions.generateTokenRequestFailed("ValueError");
    expect(result).toEqual({
      type: "GENERATE_TOKEN_REQUEST_FAILED",
      error: "ValueError",
    });
  });
});

// @ponicode
describe("AuthActions.verifyTokenRequest", () => {
  test("verifyTokenRequest", () => {
    let result = AuthActions.verifyTokenRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "VERIFY_TOKEN_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("AuthActions.verifyTokenRequestSuccess", () => {
  test("verifyTokenRequestSuccess", () => {
    let result = AuthActions.verifyTokenRequestSuccess(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "VERIFY_TOKEN_REQUEST_SUCCESS",
      otpData:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("AuthActions.verifyTokenRequestFailed", () => {
  test("verifyTokenRequestFailed", () => {
    let result = AuthActions.verifyTokenRequestFailed("error\n");
    expect(result).toEqual({
      type: "VERIFY_TOKEN_REQUEST_FAILED",
      error: "error\n",
    });
  });
});

// @ponicode
describe("AuthActions.verifyOTPRequest", () => {
  test("verifyOTPRequest", () => {
    let result = AuthActions.verifyOTPRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "VERIFY_OTP_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("AuthActions.verifyOTPRequestSuccess", () => {
  test("verifyOTPRequestSuccess", () => {
    let result = AuthActions.verifyOTPRequestSuccess("$p3onyycat");
    expect(result).toEqual({
      type: "VERIFY_OTP_REQUEST_SUCCESS",
      jwt: "$p3onyycat",
    });
  });
});

// @ponicode
describe("AuthActions.verifyOTPRequestFailed", () => {
  test("verifyOTPRequestFailed", () => {
    let result = AuthActions.verifyOTPRequestFailed("Message box: foo; bar\n");
    expect(result).toEqual({
      type: "VERIFY_OTP_REQUEST_FAILED",
      error: "Message box: foo; bar\n",
    });
  });
});

// @ponicode
describe("AuthActions.signOut", () => {
  test("signOut", () => {
    let result = AuthActions.signOut();
    expect(result).toEqual({ type: "SIGN_OUT" });
  });
});

// @ponicode
describe("AuthActions.refreshToken", () => {
  test("refreshToken", () => {
    let result = AuthActions.refreshToken("}");
    expect(result).toEqual({ type: "REFRESH_TOKEN", token: "}" });
  });
});

// @ponicode
describe("AuthActions.refreshTokenSuccess", () => {
  test("refreshTokenSuccess", () => {
    let result = AuthActions.refreshTokenSuccess("new");
    expect(result).toEqual({ type: "REFRESH_TOKEN_SUCCESS", jwt: "new" });
  });
});

// @ponicode
describe("AuthActions.refreshTokenFailed", () => {
  test("refreshTokenFailed", () => {
    let result = AuthActions.refreshTokenFailed("error\n");
    expect(result).toEqual({ type: "REFRESH_TOKEN_FAILED", error: "error\n" });
  });
});

// @ponicode
describe("AuthActions.generateStaffTokenRequest", () => {
  test("generateStaffTokenRequest", () => {
    let result = AuthActions.generateStaffTokenRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "GENERATE_STAFF_TOKEN_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("AuthActions.generateStaffTokenRequestFailed", () => {
  test("generateStaffTokenRequestFailed", () => {
    let result = AuthActions.generateStaffTokenRequestFailed("error\n");
    expect(result).toEqual({
      type: "GENERATE__STAFF_TOKEN_REQUEST_FAILED",
      error: "error\n",
    });
  });
});

// @ponicode
describe("AuthActions.verifyStaffTokenRequest", () => {
  test("verifyStaffTokenRequest", () => {
    let result = AuthActions.verifyStaffTokenRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "VERIFY_STAFF_TOKEN_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("AuthActions.verifyStaffTokenRequestSuccess", () => {
  test("verifyStaffTokenRequestSuccess", () => {
    let result = AuthActions.verifyStaffTokenRequestSuccess("accessdenied4u");
    expect(result).toEqual({
      type: "VERIFY_STAFF_TOKEN_REQUEST_SUCCESS",
      jwt: "accessdenied4u",
    });
  });
});

// @ponicode
describe("AuthActions.verifyStaffTokenRequestFailed", () => {
  test("verifyStaffTokenRequestFailed", () => {
    let result = AuthActions.verifyStaffTokenRequestFailed("error");
    expect(result).toEqual({
      type: "VERIFY_STAFF_TOKEN_REQUEST_FAILED",
      error: "error",
    });
  });
});
