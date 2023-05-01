import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Home from "../Home";
import store from "../../../store";
import { Provider } from "react-redux";
import { render, fireEvent, screen, act } from "../../../utils/Utils";

describe("Containers: Home", () => {
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
          <Home />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be shown My Email Template when render home page with templateType: Email", () => {
    render(<Home />, {
      preloadedState: {
        Template: {
          templateType: "Email",
          error: null,
          response: null,
          templateList: [
            {
              id: "fakeId",
              name: "fakeName",
              _id: "fake_id",
            },
          ],
        },
      },
    });

    expect(screen.getByText("My Email Template")).toBeInTheDocument();
  });

  it("should be shown My Sms Template when render home page with templateType: Sms", async () => {
    render(<Home />, {
      preloadedState: {
        Template: {
          templateType: "Sms",
          error: null,
          response: null,
          templateList: [
            {
              id: "fakeId",
              name: "fakeName",
              _id: "fake_id",
            },
          ],
        },
      },
    });

    const smsSidebar = screen.getByText("Sms");

    act(() => {
      fireEvent.click(smsSidebar);
    });

    expect(screen.getByText("My Sms Template")).toBeInTheDocument();
  });

  it("should be shown My Push Template when render home page with templateType: Push", () => {
    render(<Home />, {
      preloadedState: {
        Template: {
          templateType: "Push",
          error: null,
          response: null,
          templateList: [
            {
              id: "fakeId",
              name: "fakeName",
              _id: "fake_id",
            },
          ],
        },
      },
    });

    const pushSidebar = screen.getByText("Push");

    act(() => {
      fireEvent.click(pushSidebar);
    });

    expect(screen.getByText("My Push Template")).toBeInTheDocument();
  });

  it("should be shown toast error message when render home page with error", async () => {
    render(<Home />, {
      preloadedState: {
        Template: {
          templateType: "Email",
          error: "fakeError",
          response: null,
          templateList: [
            {
              id: "fakeId",
              name: "fakeName",
              _id: "fake_id",
            },
          ],
        },
      },
    });

    expect(await screen.findByText("fakeError")).toBeInTheDocument();
  });

  it("should be shown toast success message when render home page with response", async () => {
    render(<Home />, {
      preloadedState: {
        Template: {
          templateType: "Email",
          error: null,
          response: "fakeResponse",
          templateList: [
            {
              id: "fakeId",
              name: "fakeName",
              _id: "fake_id",
            },
          ],
        },
      },
    });

    expect(await screen.findByText("fakeResponse")).toBeInTheDocument();
  });
});
