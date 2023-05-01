import * as types from "./TemplateTypes";

const INITIAL_STATE = {
  error: null,
  loading: false,
  templateType: "Email",
  editMode: false,
  templateObject: null,
  templateList: [],
  response: null,
  ready: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_TEMPLATE_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.SAVE_TEMPLATE_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.SAVE_TEMPLATE_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.templateList,
        ...action.response,
        error: null,
      };
    }
    case types.DELETE_TEMPLATE_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.DELETE_TEMPLATE_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.DELETE_TEMPLATE_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.templateList,
        ...action.response,
        error: null,
      };
    }
    case types.GET_TEMPLATE_LIST_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.templateList,
        error: null,
      };
    }
    case types.GET_TEMPLATE_LIST_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.SET_TEMPLATE_TYPE_REQUEST: {
      return {
        ...state,
        ...action.templateType,
      };
    }
    case types.SEND_EMAIL_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.response,
        error: null,
      };
    }
    case types.SEND_EMAIL_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.SEND_SMS_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.response,
        error: null,
      };
    }
    case types.SEND_SMS_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.SET_RESPONSE_TO_DEFAULT: {
      return {
        ...state,
        response: null,
      };
    }
    case types.SET_ERROR_TO_DEFAULT: {
      return {
        ...state,
        error: null,
      };
    }
    case types.SET_TEMPLATE_OBJECT_TO_EMPTY: {
      return {
        ...state,
        templateObject: null,
      };
    }
    case types.VIEW_TEMPLATE_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.templateObject,
      };
    }
    case types.VIEW_TEMPLATE_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.EDIT_TEMPLATE_REQUEST_SUCCESS: {
      return {
        ...state,
        ...action.templateList,
      };
    }
    case types.EDIT_TEMPLATE_REQUEST_FAILED: {
      return {
        ...state,
        ...action.error,
        loading: false,
      };
    }
    case types.SET_READY: {
      return {
        ...state,
        ready: true,
      };
    }

    default:
      return state;
  }
};
