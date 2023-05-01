import { createSelector } from "reselect";

const selectTemplate = (state) => state.Template;

export const makeSelectTemplateList = () =>
  createSelector(selectTemplate, (TemplateState) => TemplateState.templateList);

export const makeSelectTemplateType = () =>
  createSelector(selectTemplate, (TemplateState) => TemplateState.templateType);

export const makeSelectError = () =>
  createSelector(selectTemplate, (TemplateState) => TemplateState.error);

export const makeSelectResponse = () =>
  createSelector(selectTemplate, (TemplateState) => TemplateState.response);

export const makeSelectReady = () =>
  createSelector(selectTemplate, (TemplateState) => TemplateState.ready);

export const makeSelectTemplateObject = () =>
  createSelector(
    selectTemplate,
    (TemplateState) => TemplateState.templateObject
  );
