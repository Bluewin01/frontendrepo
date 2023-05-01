import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import store from "../../../store";
import { Provider } from "react-redux";
import { ModalBody } from "../ModalBody";

describe("Component: Modal", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  afterEach(cleanup);
  it("should be render modalBody correctly", () => {
    const mockUseState = () => jest.fn();
    const inputfields = [
      {
        setInput: mockUseState,
        value: "to",
        showError: "showErrorMessageTo",
        name: "To",
        type: "text",
      },
    ];

    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ModalBody inputfields={inputfields} />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
