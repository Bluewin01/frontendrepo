// Service to check authentication for user and to signOut
import * as AuthActions from "../store/Auth/AuthActions";
import store from "../store";

const Auth = {
  signOut() {
    store.dispatch(AuthActions.signOut);
  },
  isAuth(jwt) {
    if (!jwt) {
      return false;
    } else {
      return true;
    }
  },
};
export default Auth;
