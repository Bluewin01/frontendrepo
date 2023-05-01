import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import { render } from "../../../utils/Utils";
import renderer from "react-test-renderer";
import store from "../../../store";
import { Provider } from "react-redux";
import Email from "../Email";

jest.useFakeTimers();

describe("Containers: Email Editor", () => {
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

  describe("Positive Case", () => {
    it("should be render correctly", () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <Email />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should be able to render email page with error", () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            error: "fakeError",
            response: null,
            templateObject: null,
          },
        },
      });
    });

    it("should be able to render email page with response", () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            error: null,
            response: "fakeResponse",
            templateObject: null,
          },
        },
      });
    });

    it("should be shown confirm & cancel button when click on save button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const saveButton = screen.getByRole("button", { name: "Save" });

      expect(saveButton).toBeInTheDocument();

      fireEvent.click(saveButton);

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(confirmButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(confirmButton);
    });

    it("should be shown send email & cancel button when click on test button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const testButton = screen.getByRole("button", { name: "Test" });

      expect(testButton).toBeInTheDocument();

      fireEvent.click(testButton);

      const sendEmailButton = screen.getByRole("button", {
        name: "Send Email",
      });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(sendEmailButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it("should shown All changes will be lost. Are you sure to continue? when click on cancel button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(
        screen.getByText("All changes will be lost. Are you sure to continue?")
      ).toBeInTheDocument();
    });

    it("should redirect to home page when click on confirm button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      const confirmButton = screen.getByRole("button", { name: "Confirm" });

      fireEvent.click(confirmButton);

      expect(global.window.location.href).toContain("/home");
    });

    it("should be shown confirm button when click on save button with passing templateObject", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: {
              name: "fakeName",
              subject: "fakeSubject",
              description: "fakeDescription",
            },
          },
        },
      });

      const saveButton = screen.getByRole("button", { name: "Save" });

      fireEvent.click(saveButton);

      const confirmButton = screen.getByRole("button", { name: "Confirm" });

      expect(confirmButton).toBeInTheDocument();
    });
  });

  describe("Negative Case", () => {
    it("should not shown confirm & cancel button when click on cancel button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const saveButton = screen.getByRole("button", { name: "Save" });

      expect(saveButton).toBeInTheDocument();

      fireEvent.click(saveButton);

      const confirmButton = screen.getByRole("button", { name: "Confirm" });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(cancelButton);
      expect(confirmButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });

    it("should not shown send email & cancel button when click on cancel button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const testButton = screen.getByRole("button", { name: "Test" });

      expect(testButton).toBeInTheDocument();

      fireEvent.click(testButton);

      const sendEmailButton = screen.getByRole("button", {
        name: "Send Email",
      });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(cancelButton);

      expect(sendEmailButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });

    it("should not be shown All changes will be lost. Are you sure to continue? when click on cancel button", async () => {
      render(<Email />, {
        preloadedState: {
          Template: {
            ready: true,
            templateObject: null,
          },
        },
      });

      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      const cancelButton2 = screen.getByRole("button", { name: "Cancel" });
      const screenText = screen.getByText(
        "All changes will be lost. Are you sure to continue?"
      );

      fireEvent.click(cancelButton2);

      expect(screenText).not.toBeInTheDocument();
    });
  });
});
