import * as types from "../LangTypes";
import reducer from "../../Lang/LangReducer";

const INITIAL_STATE = localStorage.getItem("lang") || "en";

describe("Lang Reducer", () => {
  test("SET_LANG", () => {
    const payload = "en";

    const fakeAction = {
      type: types.SET_LANG,
      payload,
    };

    const expected = payload;

    const actual = reducer(INITIAL_STATE, fakeAction);

    expect(actual).toEqual(expected);
  });

  test("GET_LANG", () => {
    const payload = "en";

    const fakeAction = {
      type: types.GET_LANG,
      payload,
    };

    const expected = payload;

    const actual = reducer(INITIAL_STATE, fakeAction);

    expect(actual).toEqual(expected);
  });

  test("return initial state in default case", () => {
    const fakeAction = "";
    const expected = INITIAL_STATE;
    const actual = reducer(INITIAL_STATE, fakeAction);
    expect(actual).toEqual(expected);
  });
});
