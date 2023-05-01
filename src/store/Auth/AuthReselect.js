import { createSelector } from "reselect";

const selectAuthentication = (state) => state.Auth;

export const makeSelectJwt = () =>
  createSelector(selectAuthentication, (AuthState) => AuthState.jwt);

export const makeSelectGroupName = () =>
  createSelector(selectAuthentication, (AuthState) => AuthState.groupName);

export const makeSelectOTPData = () =>
  createSelector(selectAuthentication, (AuthState) => AuthState.otpData);

export const makeSelectError = () =>
  createSelector(selectAuthentication, (AuthState) => {
    return AuthState.error;
  });

export const makeSelectUserCode = () =>
  createSelector(selectAuthentication, (AuthState) => AuthState.userCode);
