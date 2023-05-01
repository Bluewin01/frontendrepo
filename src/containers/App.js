import React from "react";
import { Router } from "react-router-dom";
import history from "../routes/History";
import Routes from "../routes/Routes";
import Loader from "../components/Loader/Loader";
import "./App.scss";
import { connect } from "react-redux";

class App extends React.Component {
  // App contains routes and also wrapped with snackbar and intl for localization

  render() {
    const { loading } = this.props;
    return (
        <div
          className="ltr"
          dir="ltr"
        >
          {loading ? <Loader /> : null}
          <Router history={history}>
            {<Routes />}
          </Router>
        </div>
    );
  }
}

const mapStateToProps = ({ loading }) => ({
  loading,
});

export default connect(mapStateToProps, {})(App);
