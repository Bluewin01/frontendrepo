import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Input } from "antd";
import { throttle } from "lodash";
import "./_loginStyle.css";
import { createStructuredSelector } from "reselect";
import * as AuthActions from "../../store/Auth/AuthActions";
import * as LoaderActions from "../../store/Loader/LoaderAction";
import PropTypes from "prop-types";
import Loader from "../../components/Loader/Loader";
import {
  makeSelectOTPData,
  makeSelectError,
  makeSelectJwt,
} from "../../store/Auth/AuthReselect";
import History from "../../routes/History";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const Login = (props) => {
  const {
    generateToken,
    otpData,
    sendVerifyOTP,
    error,
    loading,
    showLoader,
    generateStaffToken,
    jwt,
  } = props;
  const [isOTP, setIsOTP] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (jwt) {
      showLoader(false);
      History.push("/home");
    }
  }, [jwt, showLoader]);

  useEffect(() => {
    if (error !== null) {
      setErrorMessage(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (otpData !== null) {
      setIsOTP(true);
    }
  }, [otpData]);

  function validateUserInput(userID, password) {
    let regex = new RegExp("[^a-zA-Z0-9]");

    if (
      (userID,
      password === null || userID,
      password === "" || userID,
      password === undefined || password === "")
    ) {
      setErrorMessage("Please fill in your ID or password");
    } else {
      if (userID.match(regex)) {
        setErrorMessage("Invalid ID");
      } else {
        verifyUserType(userID, password);
      }
    }
  }

  function verifyUserType(userID, password) {
    if (userID.charAt(0) === "I") {
      generateStaffToken(userID, password);
    } else {
      if (userID.length === 5) {
        generateToken(userID, password);
        showLoader(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid ID");
      }
    }
  }

  const handleOnSubmit = (data) => {
    const { userID, password } = data;
    validateUserInput(userID, password);
  };

  const handleOnOTPSubmit = (data) => {
    const { OTPCode } = data;
    sendVerifyOTP(otpData.id, OTPCode);
  };

  const throtleOnSubmitHandler = throttle(handleOnSubmit, 1000 * 30);

  return (
    <div className="login">
      {!isOTP ? (
        <>
          <h3>Login to NTP </h3>
          <Form
            className="login__form"
            onFinish={throtleOnSubmitHandler}
            layout="vertical"
          >
            <div className="input__form">
              <Form.Item
                style={{
                  fontSize: "20px",
                }}
                label="User ID"
                name="userID"
              >
                <Input
                  data-testid="userID"
                  placeholder="User ID"
                  autoComplete="off"
                ></Input>
              </Form.Item>
            </div>
            <div className="input__form">
              <Form.Item label="Password" name="password">
                <Input
                  data-testid="password"
                  type="password"
                  placeholder="Password"
                  width="100%"
                  autoComplete="off"
                ></Input>
              </Form.Item>
            </div>
            <div className="input__form">
              <Form.Item>
                <Button
                  data-testid="loginButton"
                  htmlType="submit"
                  danger
                  className="btn__primary"
                  size="large"
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      ) : (
        <>
          <h3>Login to NTP</h3>
          <div style={{ fontSize: "16px", margin: "16px 0" }}>
            OTP code has been sent to your mobile number
          </div>
          <Form
            className="login__form"
            onFinish={handleOnOTPSubmit}
            layout="vertical"
          >
            <div className="input__form">
              <Form.Item label="OTP Code" name="OTPCode">
                <Input
                  data-testid="otp"
                  placeholder="OTP Code"
                  autoComplete="off"
                ></Input>
              </Form.Item>
            </div>
            <div className="input__form">
              <Form.Item>
                <Button
                  data-testid="otpButton"
                  htmlType="submit"
                  danger
                  className="btn__primary"
                  size="large"
                >
                  {isResend ? `Resend OTP` : "Verify OTP"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      )}
      {loading ? <Loader></Loader> : null}
      {<ErrorMessage error={errorMessage} />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  otpData: makeSelectOTPData(),
  error: makeSelectError(),
  jwt: makeSelectJwt(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    generateToken: (userID, password) =>
      dispatch(AuthActions.generateTokenRequest({ userID, password })),
    showLoader: (isLoading) => dispatch(LoaderActions.loader(isLoading)),
    sendVerifyOTP: (id, code) =>
      dispatch(AuthActions.verifyOTPRequest({ id, code })),
    generateStaffToken: (userID, password) =>
      dispatch(AuthActions.generateStaffTokenRequest({ userID, password })),
  };
};

Login.protoTypes = {
  generateToken: PropTypes.func,
  generateAuthToken: PropTypes.object,
  otpData: PropTypes.object,
  sendVerifyOTP: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  generateStaffToken: PropTypes.func,
  jwt: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
