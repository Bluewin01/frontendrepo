import {
  saveTemplate,
  deleteTemplate,
  getTemplateList,
  sendEmail,
  sendSms,
  viewTemplate,
  editTemplate,
} from "../TemplateSaga";
import assert from "assert";
import { put } from "redux-saga/effects";
import * as ACTIONS from "../TemplateActions";
import * as AuthACTIONS from "../../Auth/AuthActions";

jest.mock("../TemplateApis");

describe("saveTemplate function", () => {
  test("save email template successfully", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Email",
        rawValue: "",
      },
    };
    const generator = saveTemplate(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.saveTemplateRequestSuccess({
          templateList: templateList,
          response: "Template saved successfully",
        })
      ),
      "put saveTemplateRequestSuccess action"
    );
  });

  test("save sms template successfully", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Sms",
      },
    };

    const generator = saveTemplate(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: "",
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.saveTemplateRequestSuccess({
          templateList: templateList,
          response: "Template saved successfully",
        })
      ),
      "put saveTemplateRequestSuccess action"
    );
  });

  test("save push template successfully", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Push",
        rawValue: "",
      },
    };

    const generator = saveTemplate(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next(response);

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.saveTemplateRequestSuccess({
          templateList: templateList,
          response: "Template saved successfully",
        })
      ),
      "put saveTemplateRequestSuccess action"
    );
  });

  test("save template successfully with refresh token", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Email",
        rawValue: "",
      },
    };

    const generator = saveTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    const { newToken } = response;

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.saveTemplateRequestSuccess({
          templateList: templateList,
          response: "Template saved successfully",
        })
      ),
      "put saveTemplateRequestSuccess action"
    );

    const jwt = newToken.data.data;
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      )
    );
  });

  test("save sms template successfully with description input", () => {
    const payload = {
      payload: {
        name: "sample name",
        subject: "sample subject",
        description: "sample description",
        value: "",
        type: "Sms",
      },
    };
    const generator = saveTemplate(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next(response);

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.saveTemplateRequestSuccess({
          templateList: templateList,
          response: "Template saved successfully",
        })
      ),
      "put saveTemplateRequestSuccess action"
    );
  });

  test("save template failed", () => {
    const payload = {
      payload: {
        body: {
          name: "",
          subject: "",
          description: "",
          value: "",
          type: "",
          rawValue: "",
        },
      },
    };
    const generator = saveTemplate(payload);
    let next = generator.next();
    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.saveTemplateRequestFailed({
          error: "Failed to save Template",
        })
      ),
      "put saveTemplateRequestFailed action"
    );
  });
});

describe("deleteTemplate function", () => {
  test("delete template successfully", () => {
    const payload = {
      payload: {
        templateId: "123456",
        templateType: "Email",
      },
    };

    const generator = deleteTemplate(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken);
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.deleteTemplateRequestSuccess({
          templateList: templateList,
          response: "Template deleted successfully",
        })
      ),
      "put deleteTemplateRequestSuccess action"
    );
  });

  test("delete template successfully with refresh token", () => {
    const payload = {
      payload: {
        templateId: "123456",
        templateType: "Email",
      },
    };

    const generator = deleteTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const templateList = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    const { newToken } = response;

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.deleteTemplateRequestSuccess({
          templateList: templateList,
          response: "Template deleted successfully",
        })
      ),
      "put deleteTemplateRequestSuccess action"
    );

    const jwt = newToken.data.data;
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      )
    );
  });

  test("delete template failed", () => {
    const payload = {
      payload: {
        body: {
          templateId: "",
          templateType: "",
        },
      },
    };
    const generator = deleteTemplate(payload);
    let next = generator.next();
    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.deleteTemplateRequestFailed({
          error: "Failed to delete template",
        })
      ),
      "put deleteTemplateRequestFailed action"
    );
  });
});

describe("getTemplateList function", () => {
  test("get template list successfully", () => {
    const payload = {
      payload: {
        templateType: "Email",
      },
    };
    const generator = getTemplateList(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const { apiResponse } = response;
    const mockData = apiResponse.data.data;
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next();
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.getTemplateListRequestSuccess({
          templateList: mockData,
        })
      ),
      "put getTemplateListRequestSuccess action"
    );
  });

  test("get email template list successfully with refresh token", () => {
    const payload = {
      payload: {
        templateType: "Email",
      },
    };
    const generator = getTemplateList(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const { apiResponse, newToken } = response;
    const mockData = apiResponse.data.data;
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next();
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.getTemplateListRequestSuccess({
          templateList: mockData,
        })
      ),
      "put getTemplateListRequestSuccess action"
    );
    const jwt = newToken.data.data;
    next = generator.next();
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      ),
      "put refreshTokenSuccess action"
    );
  });

  test("get template list failed", () => {
    const payload = {
      payload: {
        templateType: "Email",
      },
    };
    const generator = getTemplateList(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: {
        data: {
          data: [{ name: "sample" }, { name: "mock" }],
          success: false,
        },
      },
    };
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next();
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.getTemplateListRequestFailed({
          error: "Failed to get the template list",
        })
      )
    );
  });

  test("it failed to get email template list with error 400", () => {
    const payload = {
      payload: {
        templateType: "Email",
      },
    };
    const fakeError = { response: { status: 400, data: {} } };
    const message = "Failed to get the template list";
    const generator = getTemplateList(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.getTemplateListRequestFailed({
          error: message,
        })
      ),
      "put getTemplateListRequestFailed action"
    );
  });

  test("it failed to get template list with error 401", () => {
    const payload = {
      payload: {
        templateType: "",
      },
    };
    const fakeError = { response: { status: 401, data: {} } };
    const message = "Your session is expired, please login again";
    const generator = getTemplateList(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.getTemplateListRequestFailed({
          error: message,
        })
      ),
      "put getTemplateListRequestFailed action"
    );
  });
});

describe("sendEmail function", () => {
  const payload = {
    payload: {
      to: ["ali@gmail.com", "john@gmail.com"],
      from: "kris@gmail.com",
      value: "",
      subject: "sample",
      cc: "mark@gmail.com",
      bcc: "zain@gmail.com",
    },
  };

  test("send email successfully", () => {
    const generator = sendEmail(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendEmailRequestSuccess({
          response: "Email sent successfully",
        })
      ),
      "put sendEmailRequestSuccess action"
    );
  });

  test("send email successfully with refresh token", () => {
    const generator = sendEmail(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    const { newToken } = response;

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendEmailRequestSuccess({
          response: "Email sent successfully",
        })
      ),
      "put sendEmailRequestSuccess action"
    );

    const jwt = newToken.data.data;
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      )
    );
  });

  test("it failed to send email template with error 400", () => {
    const fakeError = { response: { status: 400, data: {} } };
    const message = "Failed to send email";
    const generator = sendEmail(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendEmailRequestFailed({
          error: message,
        })
      ),
      "put sendEmailRequestFailed action"
    );
  });

  test("it failed to send email template with error 401", () => {
    const fakeError = { response: { status: 401, data: {} } };
    const message = "Your session is expired, please login again";
    const generator = sendEmail(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendEmailRequestFailed({
          error: message,
        })
      ),
      "put sendEmailRequestFailed action"
    );
  });
});

describe("sendSms function", () => {
  const payload = {
    payload: {
      phoneList: ["011-2342183", "011-23453912", "012-5599900"],
      value: "",
      subject: "",
    },
  };

  test("send sms template successfully", () => {
    const generator = sendSms(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    let next = generator.next();
    next = generator.next(jwtToken);
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendSmsRequestSuccess({
          response: "Sms sent successfully",
        })
      ),
      "put sendSmsRequestSuccess action"
    );
  });

  test("send sms template successfully with refresh token", () => {
    const generator = sendSms(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    const { newToken } = response;

    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendSmsRequestSuccess({
          response: "Sms sent successfully",
        })
      ),
      "put sendSmsRequestSuccess action"
    );

    const jwt = newToken.data.data;
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      )
    );
  });

  test("it failed to send sms template with error 400", () => {
    const fakeError = { response: { status: 400, data: {} } };
    const message = "Failed to send sms";
    const generator = sendSms(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendSmsRequestFailed({
          error: message,
        })
      ),
      "put sendSmsRequestFailed action"
    );
  });

  test("it failed to send sms template with error 401", () => {
    const fakeError = { response: { status: 401, data: {} } };
    const message = "Your session is expired, please login again";
    const generator = sendSms(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.sendSmsRequestFailed({
          error: message,
        })
      ),
      "put sendSmsRequestFailed action"
    );
  });
});

describe("viewTemplate function ", () => {
  test("view template successfully", () => {
    const payload = {
      payload: {
        templateId: "12345",
      },
    };
    const generator = viewTemplate(payload);
    const jwtToken = { refreshToken: {} };
    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } }, //mock data inside data :{template}
    };
    const { apiResponse } = response;
    const mockData = apiResponse.data.data;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.viewTemplateRequestSuccess({
          templateObject: mockData,
        })
      )
    );
  });

  test("view template successfully with refresh token", () => {
    const payload = {
      payload: {
        templateId: "12345",
      },
    };
    const generator = viewTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    const { newToken } = response;
    const jwt = newToken.data.data;
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      )
    );
  });

  test("it failed to view template with error 400", () => {
    const payload = {
      payload: {
        templateId: "12345",
      },
    };
    const fakeError = { response: { status: 400, data: {} } };
    const message = "Failed to view template";
    const generator = viewTemplate(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.viewTemplateRequestFailed({
          error: message,
        })
      ),
      "put viewTemplateRequestFailed action"
    );
  });

  test("it failed to view template with error 401", () => {
    const payload = {
      payload: {
        templateId: "12345",
      },
    };
    const fakeError = { response: { status: 401, data: {} } };
    const message = "Your session is expired, please login again";
    const generator = viewTemplate(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.viewTemplateRequestFailed({
          error: message,
        })
      ),
      "put viewTemplateRequestFailed action"
    );
  });
});

describe("editTemplate function", () => {
  test("edit email template successfully", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Email",
        rawValue: "",
      },
    };

    const generator = editTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const template = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.editTemplateRequestSuccess({
          templateList: template,
          response: "Template saved successfully",
        })
      )
    );
  });

  test("edit template sms successfully", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Sms",
        rawValue: "",
      },
    };

    const generator = editTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const template = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.editTemplateRequestSuccess({
          templateList: template,
          response: "Template saved successfully",
        })
      )
    );
  });

  test("edit push template successfully", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Push",
        rawValue: "",
      },
    };

    const generator = editTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: { data: { data: { jwt: "mockJwt" } } },
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const template = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    const { newToken } = response;

    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.editTemplateRequestSuccess({
          templateList: template,
          response: "Template saved successfully",
        })
      )
    );
    const jwt = newToken.data.data;
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        AuthACTIONS.refreshTokenSuccess({
          jwt: jwt,
        })
      )
    );
  });

  test("edit sms template successfully with description input", () => {
    const payload = {
      payload: {
        name: "sample name",
        subject: "sample subject",
        description: "sample description",
        value: "",
        type: "Sms",
        rawValue: "",
        templateId: "123456",
      },
    };

    const generator = editTemplate(payload);
    const jwtToken = { refreshToken: {} };

    const response = {
      newToken: null,
      apiResponse: { data: { data: { template: {} }, success: true } },
    };
    const template = response.apiResponse.data.data.template;
    let next = generator.next();

    next = generator.next(jwtToken); //yield call
    next = generator.next(response); //yield put
    next = generator.next(response);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.editTemplateRequestSuccess({
          templateList: template,
          response: "Template saved successfully",
        })
      )
    );
  });

  test("it failed to edit email template with error 400", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Email",
        rawValue: "",
      },
    };
    const fakeError = { response: { status: 400, data: {} } };
    const message = "Failed to edit template";
    const generator = editTemplate(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.editTemplateRequestFailed({
          error: message,
        })
      ),
      "put editTemplateRequestFailed action"
    );
  });

  test("it failed to edit email template with error 401", () => {
    const payload = {
      payload: {
        name: "",
        subject: "",
        description: "",
        value: "",
        type: "Email",
        rawValue: "",
      },
    };
    const fakeError = { response: { status: 401, data: {} } };
    const message = "Your session is expired, please login again";
    const generator = editTemplate(payload);
    let next = generator.next();
    next = generator.throw(fakeError);
    assert.deepEqual(
      next.value,
      put(
        ACTIONS.editTemplateRequestFailed({
          error: message,
        })
      ),
      "put editTemplateRequestFailed action"
    );
  });
});
