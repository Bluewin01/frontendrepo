import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "../../../utils/Utils";
import { MultiInputField } from "../MultiInputField";

describe("Component: InputField", () => {
  const createField = jest.fn();
  const deleteField = jest.fn();
  const setInputList = jest.fn();

  const List = [
    {
      error: "xxx is required",
      name: `xxx`,
      value: "",
      placeholder: "e.g: email@aia.com",
      required: true,
      setInput: setInputList,
    },
    {
      error: "",
      name: `xxxxx`,
      value: "",
      placeholder: "e.g: email@aia.com",
      setInput: setInputList,
    },
  ];

  const mockField = {
    label: "XX",
    required: true,
    inputFields: List,
    createField: createField,
    deleteField: deleteField,
  };

  it("should update the array value onChange", () => {
    const { getByTestId } = render(<MultiInputField {...mockField} />);

    const input = getByTestId("multiInput0");

    fireEvent.change(input, { target: { value: "1" } });
    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: " " } });
    expect(input.value).toBe("");
  });

  it("should delete the new input field after clicking minus button", () => {
    render(<MultiInputField {...mockField} />);

    const minusButton = screen.getByTestId("minusButton1");
    fireEvent.click(minusButton);
  });
});
