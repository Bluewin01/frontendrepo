import { AuthSaga } from "../Auth/AuthSaga";
import { TemplateSaga } from "../Template/TemplateSaga";
import { fork, all } from "redux-saga/effects";

export function* watchSagas() {
  yield all([AuthSaga(), TemplateSaga()]);
}
