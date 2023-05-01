import * as types from "./../TemplateTypes";
import reducer from "../TemplateReducer";

const INITIAL_STATE = {
  error: null,
  loading: false,
  templateType: "Email",
  editMode: false,
  templateObject: null,
  templateList: [],
  response: null,
};

describe("Template Reducer", () => {
  test("returns null error and loading is true when SAVE_TEMPLATE_REQUEST action is received", () => {
    const fakePayload = { fakePayload: {} };

    const fakeAction = {
      type: types.SAVE_TEMPLATE_REQUEST,
      fakePayload,
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

  test("returns response message and loading is false when SAVE_TEMPLATE_REQUEST_FAILED action is received", () => {
    const error = { response: "Failed to save Template" };
    const fakeAction = {
      type: "SAVE_TEMPLATE_REQUEST_FAILED",
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

  test("returns templateList, response and null error when SAVE_TEMPLATE_REQUEST_SUCCESS action is received", () => {
    const templateList = [
      {
        id: "62b12dd1128d16d3782e98a1",
        name: "Heading Hello1",
        _id: "62b12dd1128d16d3782e98a1",
      },
    ];
    const response = { response: "Template saved successfully" };

    const fakeAction = {
      type: "SAVE_TEMPLATE_REQUEST_SUCCESS",
      templateList,
      response,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.templateList,
      ...fakeAction.response,
      error: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null error, loading is true when DELETE_TEMPLATE_REQUEST action is received", () => {
    const fakePayload = { fakePayload: {} };

    const fakeAction = {
      type: "DELETE_TEMPLATE_REQUEST",
      fakePayload,
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

  test("returns response message and loading is false when DELETE_TEMPLATE_REQUEST_FAILED action is received", () => {
    const error = { response: "Failed to delete template" };
    const fakeAction = {
      type: "DELETE_TEMPLATE_REQUEST_FAILED",
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

  test("returns templateList, response and null error when DELETE_TEMPLATE_REQUEST_SUCCESS action is received", () => {
    const templateList = [
      {
        id: "62b12dd1128d16d3782e98a1",
        name: "Heading Hello1",
        _id: "62b12dd1128d16d3782e98a1",
      },
    ];
    const response = { response: "Template deleted successfully" };

    const fakeAction = {
      type: "DELETE_TEMPLATE_REQUEST_SUCCESS",
      templateList,
      response,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.templateList,
      ...fakeAction.response,
      error: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns templateList and null error when GET_TEMPLATE_LIST_REQUEST_SUCCESS action is received", () => {
    const templateList = [
      {
        id: "62b12dd1128d16d3782e98a1",
        name: "Heading Hello1",
        _id: "62b12dd1128d16d3782e98a1",
      },
    ];

    const fakeAction = {
      type: "GET_TEMPLATE_LIST_REQUEST_SUCCESS",
      templateList,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.templateList,
      error: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error message and loading is false when GET_TEMPLATE_LIST_REQUEST_FAILED action is received", () => {
    const error = { error: "Failed to get the template list" };
    const fakeAction = {
      type: "GET_TEMPLATE_LIST_REQUEST_FAILED",
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

  test("returns templateType when SET_TEMPLATE_TYPE_REQUEST action is received", () => {
    const templateType = { templateType: "Email" };

    const fakeAction = {
      type: types.SET_TEMPLATE_TYPE_REQUEST,
      templateType,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.templateType,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns response message, null error when SEND_EMAIL_REQUEST_SUCCESS action is received", () => {
    const response = { response: "Email sent successfully" };

    const fakeAction = {
      type: "SEND_EMAIL_REQUEST_SUCCESS",
      response,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.response,
      error: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns error message and loading is false when SEND_EMAIL_REQUEST_FAILED action is received", () => {
    const error = { error: "Failed to send email" };
    const fakeAction = {
      type: "SEND_EMAIL_REQUEST_FAILED",
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

  test("returns response message, null error when SEND_SMS_REQUEST_SUCCESS action is received", () => {
    const response = { response: "Sms sent successfully" };

    const fakeAction = {
      type: "SEND_SMS_REQUEST_SUCCESS",
      response,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.response,
      error: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns response message and loading is false when SEND_SMS_REQUEST_FAILED action is received", () => {
    const error = { error: "Failed to send sms" };
    const fakeAction = {
      type: "SEND_SMS_REQUEST_FAILED",
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

  test("returns null response when SET_RESPONSE_TO_DEFAULT action is received", () => {
    const fakeAction = {
      type: types.SET_RESPONSE_TO_DEFAULT,
      response: null,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      response: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns null templateObject when SET_TEMPLATE_OBJECT_TO_EMPTY action is received", () => {
    const fakeAction = {
      type: types.SET_TEMPLATE_OBJECT_TO_EMPTY,
      templateObject: null,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      response: null,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns templateObject when VIEW_TEMPLATE_REQUEST_SUCCESS action is received", () => {
    const templateObject = {
      templateObject: {
        createdAt: "2022-06-21T02:33:32.952Z",
        description: "TEXT Hello1",
        id: "62b12dfc128d16d3782e98a9",
        name: "TEXT Hello1",
        rawValue: {},
        subject: "TEXT Hello1",
        type: "Email",
        updatedAt: "2022-06-23T09:32:04.249Z",
        user: "I013896",
        value: "",
        _id: "62b12dfc128d16d3782e98a9",
      },
    };

    const fakeAction = {
      type: types.VIEW_TEMPLATE_REQUEST_SUCCESS,
      templateObject,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.templateObject,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns response message and loading is false when VIEW_TEMPLATE_REQUEST_FAILED action is received", () => {
    const error = { error: "Failed to view template" };
    const fakeAction = {
      type: "VIEW_TEMPLATE_REQUEST_FAILED",
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

  test("returns templateList when EDIT_TEMPLATE_REQUEST_SUCCESS action is received", () => {
    const payload = {
      templateList: [
        {
          id: "62b12dd1128d16d3782e98a1",
          name: "Heading Hello1",
          _id: "62b12dd1128d16d3782e98a1",
        },
      ],
    };

    const fakeAction = {
      type: types.EDIT_TEMPLATE_REQUEST_SUCCESS,
      templateList: payload,
    };

    const initialState = INITIAL_STATE;
    const expected = {
      ...initialState,
      ...fakeAction.templateList,
    };

    const actual = reducer(initialState, fakeAction);
    expect(actual).toEqual(expected);
  });

  test("returns response message and loading is false when EDIT_TEMPLATE_REQUEST_FAILED action is received", () => {
    const error = { error: "Failed to edit template" };
    const fakeAction = {
      type: "EDIT_TEMPLATE_REQUEST_FAILED",
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
