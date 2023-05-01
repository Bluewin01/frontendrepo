import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import lang from "../Lang/LangReducer";
import loader from "../Loader/LoaderReducer";
import Auth from "../Auth/AuthReducer";
import Template from "../Template/TemplateReducer";

const rootReducer = combineReducers({
  lang,
  loader,
  Auth,
  Template,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
