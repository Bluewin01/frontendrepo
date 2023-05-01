import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "../../../utils/Utils";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import store from "../../../store";
import { Provider } from "react-redux";
import Navbar from "../Navbar";

describe("Component: Navbar", () => {
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
  it("should be render correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
