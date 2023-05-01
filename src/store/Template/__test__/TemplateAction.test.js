import React from "react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../../store";
import { Provider } from "react-redux";

const TemplateActions = require("../TemplateActions");

describe("Template Action", () => {
  test("should be render correctly", () => {
    <Provider store={store}>
      <TemplateActions />
    </Provider>;
  });
});

describe("TemplateActions.saveTemplateRequest", () => {
  test("Save Template Request", () => {
    let result = TemplateActions.saveTemplateRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "SAVE_TEMPLATE_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

describe("TemplateActions.saveTemplateRequestFailed", () => {
  test("Save Template Request Failed", () => {
    let result =
      TemplateActions.saveTemplateRequestFailed("too many arguments");
    expect(result).toEqual({
      type: "SAVE_TEMPLATE_REQUEST_FAILED",
      error: "too many arguments",
    });
  });
});

describe("TemplateActions.saveTemplateRequestSuccess", () => {
  test("Save Template Request Success", () => {
    let param1 = [
      [5, 11, 80, 1000],
      [80, 32, 10, 32],
      [1000, 11, 16, 4],
      [11, 5, 4, 5],
    ];
    let result = TemplateActions.saveTemplateRequestSuccess(param1);
    let object = [
      [5, 11, 80, 1000],
      [80, 32, 10, 32],
      [1000, 11, 16, 4],
      [11, 5, 4, 5],
    ];
    expect(result).toEqual({
      type: "SAVE_TEMPLATE_REQUEST_SUCCESS",
      templateList: object,
    });
  });
});

describe("TemplateActions.deleteTemplateRequest", () => {
  test("Delete Template Request", () => {
    let result = TemplateActions.deleteTemplateRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "DELETE_TEMPLATE_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

describe("TemplateActions.deleteTemplateRequestFailed", () => {
  test("Delete Template Request Failed", () => {
    let result =
      TemplateActions.deleteTemplateRequestFailed("too many arguments");
    expect(result).toEqual({
      type: "DELETE_TEMPLATE_REQUEST_FAILED",
      error: "too many arguments",
    });
  });
});
describe("TemplateActions.deleteTemplateRequestSuccess", () => {
  test("deleteTemplateRequestSuccess", () => {
    let param1 = [
      [80, 1, 1000, 5],
      [32, 1000, 32, 128],
      [4, 2, 5, 128],
      [1000, 32, 10, 16],
    ];
    let result = TemplateActions.deleteTemplateRequestSuccess(param1);
    let object = [
      [80, 1, 1000, 5],
      [32, 1000, 32, 128],
      [4, 2, 5, 128],
      [1000, 32, 10, 16],
    ];
    expect(result).toEqual({
      type: "DELETE_TEMPLATE_REQUEST_SUCCESS",
      templateList: object,
    });
  });
});

describe("TemplateActions.getTemplateListRequest", () => {
  test("getTemplateListRequest", () => {
    let result = TemplateActions.getTemplateListRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "GET_TEMPLATE_LIST_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

describe("TemplateActions.getTemplateListRequestSuccess", () => {
  test("getTemplateListRequestSuccess", () => {
    let param1 = [
      [1, 80, 10, 16],
      [32, 16, 256, 4],
      [128, 1000, 10, 32],
      [256, 1000, 5, 256],
    ];
    let result = TemplateActions.getTemplateListRequestSuccess(param1);
    let object = [
      [1, 80, 10, 16],
      [32, 16, 256, 4],
      [128, 1000, 10, 32],
      [256, 1000, 5, 256],
    ];
    expect(result).toEqual({
      type: "GET_TEMPLATE_LIST_REQUEST_SUCCESS",
      templateList: object,
    });
  });
});

describe("TemplateActions.getTemplateListRequestFailed", () => {
  test("getTemplateListRequestFailed", () => {
    let result = TemplateActions.getTemplateListRequestFailed("invalid choice");
    expect(result).toEqual({
      type: "GET_TEMPLATE_LIST_REQUEST_FAILED",
      error: "invalid choice",
    });
  });

  test("getTemplateListRequestFailed error", () => {
    let result = TemplateActions.getTemplateListRequestFailed("error\n");
    expect(result).toEqual({
      type: "GET_TEMPLATE_LIST_REQUEST_FAILED",
      error: "error\n",
    });
  });
});

describe("TemplateActions.setTemplateTypeRequest", () => {
  test("setTemplateTypeRequest", () => {
    let result = TemplateActions.setTemplateTypeRequest("99577-0727");
    expect(result).toEqual({
      type: "SET_TEMPLATE_TYPE_REQUEST",
      templateType: "99577-0727",
    });
  });
});

describe("TemplateActions.sendEmailRequest", () => {
  test("sendEmailRequest", () => {
    let result = TemplateActions.sendEmailRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "SEND_EMAIL_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

describe("TemplateActions.sendEmailRequestSuccess", () => {
  test("sendEmailRequestSuccess", () => {
    let result = TemplateActions.sendEmailRequestSuccess(200);
    expect(result).toEqual({
      type: "SEND_EMAIL_REQUEST_SUCCESS",
      response: 200,
    });
  });
});

describe("TemplateActions.sendEmailRequestFailed", () => {
  test("sendEmailRequestFailed", () => {
    let result = TemplateActions.sendEmailRequestFailed("error\n");
    expect(result).toEqual({
      type: "SEND_EMAIL_REQUEST_FAILED",
      error: "error\n",
    });
  });
});

describe("TemplateActions.sendSmsRequest", () => {
  test("sendSmsRequest", () => {
    let result = TemplateActions.sendSmsRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "SEND_SMS_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

describe("TemplateActions.sendSmsRequestSuccess", () => {
  test("sendSmsRequestSuccess", () => {
    let result = TemplateActions.sendSmsRequestSuccess(400);
    expect(result).toEqual({ type: "SEND_SMS_REQUEST_SUCCESS", response: 400 });
  });
});

describe("TemplateActions.sendSmsRequestFailed", () => {
  test("sendSmsRequestFailed", () => {
    let result = TemplateActions.sendSmsRequestFailed(500);
    expect(result).toEqual({ type: "SEND_SMS_REQUEST_FAILED", error: 500 });
  });
});

describe("TemplateActions.setResponseToDefault", () => {
  test("setResponseToDefault", () => {
    let result = TemplateActions.setResponseToDefault();
    expect(result).toEqual({ type: "SET_RESPONSE_TO_DEFAULT", response: null });
  });
});

describe("TemplateActions.setErrorToDefault", () => {
  test("setErrorToDefault", () => {
    let result = TemplateActions.setErrorToDefault();
    expect(result).toEqual({ type: "SET_ERROR_TO_DEFAULT", error: null });
  });
});

describe("TemplateActions.setTemplateObjectToEmpty", () => {
  test("setTemplateObjectToEmpty", () => {
    let result = TemplateActions.setTemplateObjectToEmpty();
    expect(result).toEqual({ type: "SET_TEMPLATE_OBJECT_TO_EMPTY" });
  });
});

describe("TemplateActions.viewTemplateRequest", () => {
  test("viewTemplateRequest", () => {
    let result = TemplateActions.viewTemplateRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "VIEW_TEMPLATE_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

describe("TemplateActions.viewTemplateRequestSuccess", () => {
  test("viewTemplateRequestSuccess", () => {
    let result = TemplateActions.viewTemplateRequestSuccess(
      '"[3,"false",false]"'
    );
    expect(result).toEqual({
      type: "VIEW_TEMPLATE_REQUEST_SUCCESS",
      templateObject: '"[3,"false",false]"',
    });
  });

  test("viewTemplateRequestSuccess", () => {
    let result = TemplateActions.viewTemplateRequestSuccess('"{"x":5,"y":6}"');
    expect(result).toEqual({
      type: "VIEW_TEMPLATE_REQUEST_SUCCESS",
      templateObject: '"{"x":5,"y":6}"',
    });
  });
});

describe("TemplateActions.editTemplateRequest", () => {
  test("editTemplateRequest", () => {
    let result = TemplateActions.editTemplateRequest(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "EDIT_TEMPLATE_REQUEST",
      payload:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });

  test("editTemplateRequest", () => {
    let result = TemplateActions.editTemplateRequest("");
    expect(result).toEqual({ type: "EDIT_TEMPLATE_REQUEST", payload: "" });
  });
});

describe("TemplateActions.editTemplateRequestFailed", () => {
  test("editTemplateRequestFailed", () => {
    let result = TemplateActions.editTemplateRequestFailed(500);
    expect(result).toEqual({
      type: "EDIT_TEMPLATE_REQUEST_FAILED",
      error: 500,
    });
  });
});

describe("TemplateActions.editTemplateRequestSuccess", () => {
  test("editTemplateRequestSuccess", () => {
    let result = TemplateActions.editTemplateRequestSuccess(
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"
    );
    expect(result).toEqual({
      type: "EDIT_TEMPLATE_REQUEST_SUCCESS",
      templateList:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E",
    });
  });
});

// @ponicode
describe("TemplateActions.viewTemplateRequestFailed", () => {
  test("viewTemplateRequestFailed", () => {
    let result = TemplateActions.viewTemplateRequestFailed(404);
    expect(result).toEqual({
      type: "VIEW_TEMPLATE_REQUEST_FAILED",
      error: 404,
    });
  });
});
