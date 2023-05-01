import React from "react";
import { Form } from "react-bootstrap";
import { validateIsInputEmpty } from "../../utils/InputValidation";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import {
  FlexContainer,
  PlusButton,
  MinusButton,
  plusIcon,
  minusIcon,
} from "./_MultiInputFieldStyle";

export const MultiInputField = (props) => {
  const { label, inputFields, createField, deleteField } = props;

  const handleOnChange = (current, field) => {
    field.setInput(() => {
      let foundIndex = inputFields.findIndex(
        (list) => list.name === current.target.name
      );
      inputFields[foundIndex].value = current.target.value;
      return [...inputFields];
    });

    if (validateIsInputEmpty(current.target.value).length === 0) {
      field.setInput(() => {
        let foundIndex = inputFields.findIndex(
          (list) => list.name === current.target.name
        );
        inputFields[foundIndex].error = "";
        return [...inputFields];
      });
    }
  };

  return (
    <Form.Group className="col mb-6">
      <Form.Label className={props.required && "required"}>{label}</Form.Label>
      {inputFields.map((field, index) => {
        return (
          <div key={index}>
            <FlexContainer>
              <Form.Control
                type={"text"}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                autoComplete="off"
                onChange={(e) => handleOnChange(e, field)}
                data-testid={`multiInput${index}`}
              />
              {index === 0 ? (
                <PlusButton onClick={createField}>
                  <PlusOutlined style={plusIcon} />
                </PlusButton>
              ) : (
                <MinusButton
                  data-testid={`minusButton${index}`}
                  onClick={() => {
                    deleteField(field.name);
                  }}
                >
                  <MinusOutlined style={minusIcon} />
                </MinusButton>
              )}
            </FlexContainer>
            <ErrorMessage error={field.error} />
          </div>
        );
      })}
    </Form.Group>
  );
};
