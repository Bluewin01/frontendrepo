import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "../../../utils/Utils";
import { InputField } from "../InputField";

describe("Component: InputField", () => {
  it("should be updated onChange", () => {
    const mockSetErrorHandler = () => jest.fn();
    const setInput = jest.fn();
    const mockField = {
      value: "",
      error: "xxx is required",
      name: "XXX",
      type: "text",
      placeholder: "xxxx",
      required: true,
      setInput: setInput,
      setError: mockSetErrorHandler,
    };

    render(<InputField {...mockField} />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "1" } });
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: " " } });
    expect(input.value).toBe("");
  });
});
