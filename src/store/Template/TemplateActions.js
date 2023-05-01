import * as types from "./TemplateTypes";

export const saveTemplateRequest = (payload) => ({
  type: types.SAVE_TEMPLATE_REQUEST,
  payload: payload,
});

export const saveTemplateRequestFailed = (error) => ({
  type: types.SAVE_TEMPLATE_REQUEST_FAILED,
  error,
});

export const saveTemplateRequestSuccess = (templateList, response) => ({
  type: types.SAVE_TEMPLATE_REQUEST_SUCCESS,
  templateList,
  response,
});

export const deleteTemplateRequest = (payload) => {
  return {
    type: types.DELETE_TEMPLATE_REQUEST,
    payload: payload,
  };
};

export const deleteTemplateRequestFailed = (error) => ({
  type: types.DELETE_TEMPLATE_REQUEST_FAILED,
  error,
});

export const deleteTemplateRequestSuccess = (templateList, response) => ({
  type: types.DELETE_TEMPLATE_REQUEST_SUCCESS,
  templateList,
  response,
});

export const getTemplateListRequest = (payload) => ({
  type: types.GET_TEMPLATE_LIST_REQUEST,
  payload: payload,
});

export const getTemplateListRequestSuccess = (templateList) => ({
  type: types.GET_TEMPLATE_LIST_REQUEST_SUCCESS,
  templateList: templateList,
});

export const getTemplateListRequestFailed = (error) => ({
  type: types.GET_TEMPLATE_LIST_REQUEST_FAILED,
  error,
});

export const setTemplateTypeRequest = (templateType) => ({
  type: types.SET_TEMPLATE_TYPE_REQUEST,
  templateType,
});

export const sendEmailRequest = (payload) => ({
  type: types.SEND_EMAIL_REQUEST,
  payload: payload,
});

export const sendEmailRequestSuccess = (response) => ({
  type: types.SEND_EMAIL_REQUEST_SUCCESS,
  response,
});

export const sendEmailRequestFailed = (error) => ({
  type: types.SEND_EMAIL_REQUEST_FAILED,
  error,
});

export const sendSmsRequest = (payload) => ({
  type: types.SEND_SMS_REQUEST,
  payload: payload,
});

export const sendSmsRequestSuccess = (response) => ({
  type: types.SEND_SMS_REQUEST_SUCCESS,
  response,
});

export const sendSmsRequestFailed = (error) => ({
  type: types.SEND_SMS_REQUEST_FAILED,
  error,
});

export const setResponseToDefault = () => ({
  type: types.SET_RESPONSE_TO_DEFAULT,
  response: null,
});

export const setErrorToDefault = () => ({
  type: types.SET_ERROR_TO_DEFAULT,
  error: null,
});

export const setTemplateObjectToEmpty = () => ({
  type: types.SET_TEMPLATE_OBJECT_TO_EMPTY,
});

export const viewTemplateRequest = (payload) => ({
  type: types.VIEW_TEMPLATE_REQUEST,
  payload,
});

export const viewTemplateRequestSuccess = (templateObject) => ({
  type: types.VIEW_TEMPLATE_REQUEST_SUCCESS,
  templateObject,
});

export const viewTemplateRequestFailed = (error) => ({
  type: types.VIEW_TEMPLATE_REQUEST_FAILED,
  error,
});

export const editTemplateRequest = (payload) => ({
  type: types.EDIT_TEMPLATE_REQUEST,
  payload,
});

export const editTemplateRequestSuccess = (payload) => ({
  type: types.EDIT_TEMPLATE_REQUEST_SUCCESS,
  templateList: payload,
});

export const editTemplateRequestFailed = (error) => ({
  type: types.EDIT_TEMPLATE_REQUEST_FAILED,
  error,
});

export const setReady = () => ({
  type: types.SET_READY,
  ready: true,
});
