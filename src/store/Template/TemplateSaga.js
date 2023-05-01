import { call, put, takeLatest, select } from "redux-saga/effects";
import API from "./TemplateApis";
import * as ACTIONS from "./TemplateActions";
import * as TYPES from "./TemplateTypes";
import * as AuthACTIONS from "../Auth/AuthActions";
import { makeSelectJwt } from "../../store/Auth/AuthReselect";
import { makeSelectTemplateObject } from "./TemplateReselect";

export function* saveTemplate(payload) {
  try {
    const {
      payload: { name, subject, description, value, type, rawValue },
    } = payload;
    let params = null;
    if (type === "Email") {
      params = {
        name: name,
        description: description,
        type: type,
        subject: subject,
        value: value,
        rawValue: { rawValue },
      };
    }
    if (type === "Sms") {
      params =
        description === ""
          ? {
              name: name,
              type: type,
              subject: subject,
              value: value,
            }
          : {
              name: name,
              description: description,
              type: type,
              subject: subject,
              value: value,
            };
    }
    if (type === "Push") {
      params = {
        name: name,
        description: description,
        type: type,
        subject: subject,
        value: { value },
      };
    }
    const jwtToken = yield select(makeSelectJwt());
    const { refreshToken } = jwtToken;
    const response = yield call(
      API.templateApis,
      `template/createTemplate`,
      params,
      refreshToken
    );
    const { newToken, apiResponse } = response;
    const {
      data: { success },
    } = apiResponse;
    if (success) {
      if (newToken) {
        const templateList = apiResponse.data.data.template;
        const jwt = newToken.data.data;
        yield put(
          ACTIONS.saveTemplateRequestSuccess({
            templateList: templateList,
            response: "Template saved successfully",
          })
        );
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        const templateList = apiResponse.data.data.template;
        yield put(
          ACTIONS.saveTemplateRequestSuccess({
            templateList: templateList,
            response: "Template saved successfully",
          })
        );
      }
    }
  } catch (err) {
    yield put(
      ACTIONS.saveTemplateRequestFailed({ error: "Failed to save Template" })
    );
  }
}

export function* deleteTemplate(payload) {
  try {
    const {
      payload: { templateId, templateType },
    } = payload;
    const params = {
      id: templateId,
      type: templateType,
    };
    const jwtToken = yield select(makeSelectJwt());
    const { refreshToken } = jwtToken;
    const response = yield call(
      API.deleteTemplateApis,
      `template/deleteTemplate`,
      params,
      refreshToken
    );

    if (
      response &&
      response.apiResponse &&
      response.apiResponse.data &&
      response.apiResponse.data.success
    ) {
      if (response.newToken) {
        const { newToken, apiResponse } = response;
        const templateList = apiResponse.data.data.template;
        const jwt = newToken.data.data;
        yield put(
          ACTIONS.deleteTemplateRequestSuccess({
            templateList: templateList,
            response: "Template deleted successfully",
          })
        );
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        const templateList = response.apiResponse.data.data.template;
        yield put(
          ACTIONS.deleteTemplateRequestSuccess({
            templateList: templateList,
            response: "Template deleted successfully",
          })
        );
      }
    }
  } catch (err) {
    yield put(
      ACTIONS.deleteTemplateRequestFailed({
        error: "Failed to delete template",
      })
    );
  }
}

export function* getTemplateList(payload) {
  try {
    const {
      payload: { templateType },
    } = payload;
    const params = {
      type: templateType,
    };
    const jwtToken = yield select(makeSelectJwt());
    const { refreshToken } = jwtToken;
    yield put(ACTIONS.setTemplateTypeRequest({ templateType: templateType }));
    const response = yield call(
      API.getTemplateApis,
      "template/findTemplateByType",
      params,
      refreshToken
    );
    const { newToken, apiResponse } = response;
    const {
      data: { success },
    } = apiResponse;
    if (success) {
      if (newToken) {
        const {
          data: { data },
        } = apiResponse;
        const jwt = newToken.data.data;
        yield put(
          ACTIONS.getTemplateListRequestSuccess({ templateList: data })
        );
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        const {
          data: { data },
        } = apiResponse;
        yield put(
          ACTIONS.getTemplateListRequestSuccess({ templateList: data })
        );
      }
    } else {
      yield put(
        ACTIONS.getTemplateListRequestFailed({
          error: "Failed to get the template list",
        })
      );
    }
  } catch (err) {
    const { response } = err;
    const {
      status,
      data: {},
    } = response;

    let message = null;
    if (status === 400 || 500) {
      message = "Failed to get the template list";
    }
    if (status === 401) {
      message = "Your session is expired, please login again";
    }
    yield put(
      ACTIONS.getTemplateListRequestFailed({
        error: message,
      })
    );
  }
}

export function* sendEmail(payload) {
  try {
    const {
      payload: { to, from, value, subject, cc, bcc },
    } = payload;

    to.forEach((email, i) => {
      to[i] = email.replace(/\s+/g, "");
    });

    var ccList = cc[0] !== "" && { cc };
    var bccList = bcc[0] !== "" && { bcc };

    var params = {
      to,
      from,
      bodyType: "html",
      body: value,
      subject,
      ...ccList,
      ...bccList,
    };

    const jwtToken = yield select(makeSelectJwt());

    const { refreshToken } = jwtToken;
    const response = yield call(
      API.templateApis,
      `notification/email`,
      params,
      refreshToken
    );

    const { newToken, apiResponse } = response;
    const {
      data: { success },
    } = apiResponse;

    if (success) {
      if (newToken) {
        const jwt = newToken.data.data;
        yield put(
          ACTIONS.sendEmailRequestSuccess({
            response: "Email sent successfully",
          })
        );
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        yield put(
          ACTIONS.sendEmailRequestSuccess({
            response: "Email sent successfully",
          })
        );
      }
    }
  } catch (err) {
    const {
      response: { status, data },
    } = err;

    let message = null;
    if (status === 400 || 500) {
      message = "Failed to send email";
    }
    if (status === 401) {
      message = "Your session is expired, please login again";
    }
    yield put(
      ACTIONS.sendEmailRequestFailed({
        error: message,
      })
    );
  }
}

export function* sendSms(payload) {
  try {
    const {
      payload: { phoneList, value, subject },
    } = payload;

    phoneList.forEach((phone, i) => {
      phoneList[i] = phone.replace(/\s+/g, "").replace(/-+/g, "");
    });

    const params = { to: phoneList, body: value, subject };
    const jwtToken = yield select(makeSelectJwt());
    const { refreshToken } = jwtToken;
    const response = yield call(
      API.templateApis,
      `notification/sms`,
      params,
      refreshToken
    );
    const { newToken, apiResponse } = response;
    const {
      data: { success },
    } = apiResponse;
    if (success) {
      if (newToken) {
        const jwt = newToken.data.data;
        yield put(
          ACTIONS.sendSmsRequestSuccess({ response: "Sms sent successfully" })
        );
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        yield put(
          ACTIONS.sendSmsRequestSuccess({ response: "Sms sent successfully" })
        );
      }
    }
  } catch (err) {
    const {
      response: { status },
    } = err;

    let message = null;
    if (status === 400 || 500) {
      message = "Failed to send sms";
    }
    if (status === 401) {
      message = "Your session is expired, please login again";
    }
    yield put(
      ACTIONS.sendSmsRequestFailed({
        error: message,
      })
    );
  }
}

export function* viewTemplate(payload) {
  try {
    const {
      payload: { templateId },
    } = payload;
    const jwtToken = yield select(makeSelectJwt());
    const { refreshToken } = jwtToken;
    const params = {
      templateId: templateId,
    };
    const response = yield call(
      API.getTemplateApis,
      `template/findTemplateById`,
      params,
      refreshToken
    );
    const { newToken, apiResponse } = response;
    const {
      data: { success },
    } = apiResponse;
    if (success) {
      if (newToken) {
        const { data } = apiResponse.data;
        const jwt = newToken.data.data;
        yield put(ACTIONS.viewTemplateRequestSuccess({ templateObject: data }));
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        const { data } = apiResponse.data;
        yield put(ACTIONS.viewTemplateRequestSuccess({ templateObject: data }));
      }
    }
  } catch (err) {
    const {
      response: { status, data },
    } = err;

    let message = null;
    if (status === 400 || 500) {
      message = "Failed to view template";
    }
    if (status === 401) {
      message = "Your session is expired, please login again";
    }
    yield put(
      ACTIONS.viewTemplateRequestFailed({
        error: message,
      })
    );
  }
}

export function* editTemplate(payload) {
  try {
    const {
      payload: { name, subject, description, value, rawValue, type },
    } = payload;
    const jwtToken = yield select(makeSelectJwt());
    const { refreshToken } = jwtToken;
    const templateObject = yield select(makeSelectTemplateObject());
    const { id: templateId } = templateObject;
    let params = null;
    if (type === "Email") {
      params = {
        data: {
          name: name,
          description: description,
          type: type,
          subject: subject,
          value: value,
          rawValue: { rawValue },
        },
        id: templateId,
      };
    }
    if (type === "Sms") {
      params =
        description === ""
          ? {
              data: {
                name: name,
                type: type,
                subject: subject,
                value: value,
              },
              id: templateId,
            }
          : {
              data: {
                name: name,
                description: description,
                type: type,
                subject: subject,
                value: value,
              },
              id: templateId,
            };
    }
    if (type === "Push") {
      params = {
        data: {
          name: name,
          description: description,
          type: type,
          subject: subject,
          value: { value },
        },
        id: templateId,
      };
    }
    const response = yield call(
      API.putTemplateApis,
      `template/updateTemplate`,
      params,
      refreshToken
    );
    const { newToken, apiResponse } = response;
    const {
      data: { success },
    } = apiResponse;
    if (success) {
      if (newToken) {
        const { template } = apiResponse.data.data;
        const jwt = newToken.data.data;
        yield put(
          ACTIONS.editTemplateRequestSuccess({
            templateList: template,
            response: "Template saved successfully",
          })
        );
        yield put(AuthACTIONS.refreshTokenSuccess({ jwt: jwt }));
      } else {
        const { template } = apiResponse.data.data;
        yield put(
          ACTIONS.editTemplateRequestSuccess({
            templateList: template,
            response: "Template saved successfully",
          })
        );
      }
    }
  } catch (err) {
    const {
      response: { status, data },
    } = err;
    let message = null;
    if (status === 400 || 500) {
      message = "Failed to edit template";
    }
    if (status === 401) {
      message = "Your session is expired, please login again";
    }
    yield put(
      ACTIONS.editTemplateRequestFailed({
        error: message,
      })
    );
  }
}

export function* TemplateSaga() {
  yield takeLatest(TYPES.SAVE_TEMPLATE_REQUEST, saveTemplate);
  yield takeLatest(TYPES.GET_TEMPLATE_LIST_REQUEST, getTemplateList);
  yield takeLatest(TYPES.SEND_EMAIL_REQUEST, sendEmail);
  yield takeLatest(TYPES.SEND_SMS_REQUEST, sendSms);
  yield takeLatest(TYPES.EDIT_TEMPLATE_REQUEST, editTemplate);
  yield takeLatest(TYPES.VIEW_TEMPLATE_REQUEST, viewTemplate);
  yield takeLatest(TYPES.DELETE_TEMPLATE_REQUEST, deleteTemplate);
}
