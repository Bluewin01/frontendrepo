const AuthApis = require("../AuthApis");

jest.mock("../../../network/apis");

describe("AuthApis.default.generateToken", () => {
  test("generateToken", async () => {
    await AuthApis.default.generateToken();
    expect(AuthApis.default.generateToken).toBeDefined();
  });
});

describe("AuthApis.default.verifyToken", () => {
  test("verifyToken", async () => {
    await AuthApis.default.verifyToken();
    expect(AuthApis.default.verifyToken).toBeDefined();
  });
});

describe("AuthApis.default.verifyOTP", () => {
  test("verifyOTP", async () => {
    await AuthApis.default.verifyOTP();
    expect(AuthApis.default.verifyOTP).toBeDefined();
  });
});

describe("AuthApis.default.generateStaffToken", () => {
  test("generateStaffToken", async () => {
    await AuthApis.default.generateStaffToken();
    expect(AuthApis.default.generateStaffToken).toBeDefined();
  });
});

describe("AuthApis.default.verifyStaff", () => {
  test("verifyStaff", async () => {
    await AuthApis.default.verifyStaff();
    expect(AuthApis.default.verifyStaff).toBeDefined();
  });
});

describe("AuthApis.default.refreshToken", () => {
  test("refreshToken", async () => {
    await AuthApis.default.refreshToken();
    expect(AuthApis.default.refreshToken).toBeDefined();
  });
});
