import React from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { validateIsInputEmpty } from "../../utils/InputValidation";

export const InputField = (props) => {
  const { type, name, value, setInput, placeholder, error, setError } = props;

  const handleOnChange = (current) => {
    setInput(current.target.value);
    if (validateIsInputEmpty(current.target.value).length === 0) {
      setError("");
    }
  };

  return (
    <Form.Group key={name} className="col mb-6">
      <Form.Label className={props.required && "required"}>{name}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        autoComplete="off"
        data-testid="input"
      />
      <ErrorMessage error={error} />
    </Form.Group>
  );
};
