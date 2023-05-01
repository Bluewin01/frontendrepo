import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from "../../../utils/Utils";
import renderer from "react-test-renderer";
import Login from "../Login";
import store from "../../../store";
import { Provider } from "react-redux";
import { waitForElement } from "@testing-library/react";

describe("Containers: Login", () => {
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
          <Login />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Positive Case", () => {
  it("should can input agent userID and password", () => {
    render(<Login />);
    const mockUserID = "12345";
    const mockPassword = "abcd1234";
    const userID = screen.getByTestId("userID");
    const password = screen.getByTestId("password");
    const button = screen.queryByTestId("loginButton");
    act(() => {
      /* fire events that update state */
      fireEvent.change(userID, { target: { value: mockUserID } });
      fireEvent.change(password, { target: { value: mockPassword } });
      fireEvent.click(button);
    });
    expect(userID.value).toBe(mockUserID);
    expect(password.value).toBe(mockPassword);
    expect(button).toHaveTextContent("Login");
  });

  it("should can input staff userID and password", () => {
    render(<Login />);
    const mockUserID = "I012345";
    const mockPassword = "abcd1234";
    const userID = screen.getByTestId("userID");
    const password = screen.getByTestId("password");
    const button = screen.queryByTestId("loginButton");
    act(() => {
      /* fire events that update state */
      fireEvent.change(userID, { target: { value: mockUserID } });
      fireEvent.change(password, { target: { value: mockPassword } });
      fireEvent.click(button);
    });
    expect(userID.value).toBe(mockUserID);
    expect(password.value).toBe(mockPassword);
    expect(button).toHaveTextContent("Login");
  });
});

describe("Negative Case", () => {
  it("should not be able to input null for userID and password", async () => {
    render(<Login />);
    const mockUserID = "";
    const mockPassword = "";
    const userID = screen.getByTestId("userID");
    const password = screen.getByTestId("password");
    const button = screen.queryByTestId("loginButton");

    act(() => {
      /* fire events that update state */
      fireEvent.change(userID, { target: { value: mockUserID } });
      fireEvent.change(password, { target: { value: mockPassword } });
      fireEvent.click(button);
    });

    await waitForElement(() => screen.getByTestId("errorMessage"));
    expect(
      screen.getByText("Please fill in your ID or password")
    ).toBeInTheDocument();
  });

  it("should not be able to input userID less than 5 digits", async () => {
    render(<Login />);
    const mockUserID = "1234";
    const mockPassword = "mockPassword";
    const userID = screen.getByTestId("userID");
    const password = screen.getByTestId("password");
    const button = screen.queryByTestId("loginButton");

    act(() => {
      /* fire events that update state */
      fireEvent.change(userID, { target: { value: mockUserID } });
      fireEvent.change(password, { target: { value: mockPassword } });
      fireEvent.click(button);
    });

    await waitForElement(() => screen.getByTestId("errorMessage"));
    expect(screen.getByText("Invalid ID")).toBeInTheDocument();
  });

  it("should not be able to input userID with space", async () => {
    render(<Login />);
    const mockUserID = "123 45";
    const mockPassword = "mockPassword";
    const userID = screen.getByTestId("userID");
    const password = screen.getByTestId("password");
    const button = screen.queryByTestId("loginButton");

    act(() => {
      /* fire events that update state */
      fireEvent.change(userID, { target: { value: mockUserID } });
      fireEvent.change(password, { target: { value: mockPassword } });
      fireEvent.click(button);
    });

    await waitForElement(() => screen.getByTestId("errorMessage"));
    expect(screen.getByText("Invalid ID")).toBeInTheDocument();
  });
});
