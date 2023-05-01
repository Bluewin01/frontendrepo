import Auth from "../Auth";
import store from "../../store";
import * as Authenticate from "../Auth";
import * as AuthActions from "./../../store/Auth/AuthActions";

jest.mock("../../store");

describe("Test Auth", () => {
  test("It should be defined", () => {
    expect(Auth).toBeDefined;
  });
  // test("Did not pass JWT", () => {
  //   Authenticate.Auth = false;

  //   expect(Auth).toBe(false);
  // });
  // test("Pass JWT", () => {
  //   Authenticate.Auth = true;

  //   expect(Auth).toBe(true);
  // });
  test("Sign Out", () => {
    store.dispatch.mockResolvedValue(true);
    Auth.signOut();
    // const signOut =
    // expect(signOut).toBeCalledTimes(1);
  });
  test("Test isAuth with JWT", () => {
    const isAuth = Auth.isAuth("jwt here");

    expect(isAuth).toBe(true);
  });
  test("Test isAuth with no JWT", () => {
    const isAuth = Auth.isAuth();

    expect(isAuth).toBe(false);
  });
});
