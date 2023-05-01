import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route, Redirect } from "react-router-dom";
import Auth from "../utils/Auth";
import PropTypes from "prop-types";
import { makeSelectJwt } from "../store/Auth/AuthReselect";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { lang } = useSelector((state) => state);
  const { jwt } = props;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...props}
      render={(props) =>
        Auth.isAuth(jwt) ? <Component {...props} /> : <Redirect to={`/login`} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  jwt: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  jwt: makeSelectJwt()
});

export default connect(mapStateToProps)(PrivateRoute);
