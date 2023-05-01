import React, { Suspense, useEffect } from "react";
import {
  Router,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import history from "./History";
import * as LazyComponent from "../utils/LazyLoaded";
import Loader from "../components/Loader/Loader";
import PrivateRoute from "../utils/PrivateRoute";
import store from "../store";
import { setCurrentLang } from "../store/Lang/LangAction";
import Navbar from "../components/Navbar/Navbar";

const Routes = ({ lang }) => {
  const location = useLocation();
  const History = useHistory();

  useEffect(() => {
    store.dispatch(setCurrentLang("en"));
  }, []);

  useEffect(() => {
    const pathname = location.pathname.split("/");
    pathname[1] = pathname[1] === "en" ? "en" : "en";
    const newPathname = pathname.join("/");
    History.push(newPathname.replace(/en|en/, lang));
  }, [lang]);

  return (
    <Suspense fallback={<Loader />}>
      <Router history={history}>
        <Navbar />
        <Switch>
          <LazyComponent.Login path="/login" exact />
          <PrivateRoute component={LazyComponent.Login} path="/" exact />
          <PrivateRoute component={LazyComponent.Home} path="/home" exact />
          <PrivateRoute component={LazyComponent.Email} path="/email" exact />
          <PrivateRoute component={LazyComponent.Sms} path="/sms" exact />
          <PrivateRoute component={LazyComponent.Push} path="/push" exact />
          <Redirect from="**" to={"/login"} exact />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
