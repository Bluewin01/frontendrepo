import React from "react";
import { Form } from "react-bootstrap";
import "../../assets/css/editor.css";

export const ErrorMessage = (props) => {
  return (
    <>
      {props.error && (
        <Form.Label data-testid="errorMessage" className="errorMessage">
          {props.error}
        </Form.Label>
      )}
    </>
  );
};
