import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, fireEvent, act } from "@testing-library/react";
import { render } from "../../../utils/Utils";
import renderer from "react-test-renderer";
import store from "../../../store";
import { Provider } from "react-redux";
import PushEditor from "../PushEditor";

jest.useFakeTimers();

describe("Containers: Push Editor", () => {
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
            <PushEditor />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should be able to render email page with error", () => {
      render(<PushEditor />, {
        preloadedState: {
          Template: {
            error: "fakeError",
            response: null,
            templateObject: null,
          },
        },
      });
    });

    it("should be able to render email page with response", () => {
      render(<PushEditor />, {
        preloadedState: {
          Template: {
            error: null,
            response: "fakeResponse",
            templateObject: null,
          },
        },
      });
    });

    it("should can input all the fields", () => {
      render(<PushEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";

      const inputName = screen.getByTestId("name");
      const inputSubject = screen.getByTestId("subject");
      const inputDescription = screen.getByTestId("description");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputDescription, {
        target: { value: mockDescription },
      });
      fireEvent.change(inputMessage, { target: { value: mockMessage } });

      expect(inputName.value).toBe(mockTemplateName);
      expect(inputSubject.value).toBe(mockSubject);
      expect(inputDescription.value).toBe(mockDescription);
      expect(inputMessage.value).toBe(mockMessage);
    });

    it("should can be save the template after input all fields", async () => {
      render(<PushEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";

      const inputName = screen.getByTestId("name");
      const inputSubject = screen.getByTestId("subject");
      const inputDescription = screen.getByTestId("description");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputDescription, {
        target: { value: mockDescription },
      });
      fireEvent.change(inputMessage, { target: { value: mockMessage } });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);
      act(() => jest.runOnlyPendingTimers());

      expect(saveButton).toHaveTextContent("Save");
      expect(confirmButton).toHaveTextContent("Confirm");
    });

    it("should can be send the template after input all fields", async () => {
      render(<PushEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";

      const inputName = screen.getByTestId("name");
      const inputSubject = screen.getByTestId("subject");
      const inputDescription = screen.getByTestId("description");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputDescription, {
        target: { value: mockDescription },
      });
      fireEvent.change(inputMessage, { target: { value: mockMessage } });

      const sendButton = screen.getAllByRole("button")[0];
      fireEvent.click(sendButton);

      const confirmButton = screen.getAllByRole("button")[0];
      fireEvent.click(confirmButton);

      expect(confirmButton).toHaveTextContent("Confirm");
    });

    it("should be redirect to /home route when click cancel button", () => {
      render(<PushEditor />);
      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      expect(
        screen.getByText("All changes will be lost. Are you sure to continue?")
      ).toBeInTheDocument();

      const confirmButton = screen.getByText("Confirm");
      fireEvent.click(confirmButton);
      expect(global.window.location.href).toContain("/home");
    });

    it("should be able to save with template object and redirect to home page", async () => {
      render(<PushEditor />, {
        preloadedState: {
          Template: {
            error: null,
            response: null,
            templateObject: {
              name: "fakeName",
              subject: "fakeSubject",
              description: "fakeDescription",
              value: { value: "fakeMessage" },
            },
          },
        },
      });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);

      expect(global.window.location.href).toContain("/home");
    });
  });

  describe("Negative Case", () => {
    it("should show error message for template name when saving with no template name", () => {
      render(<PushEditor />);
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";
      const mockErrorMessage = "Template Name is required.";

      const inputSubject = screen.getByTestId("subject");
      const inputDescription = screen.getByTestId("description");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputDescription, {
        target: { value: mockDescription },
      });
      fireEvent.change(inputMessage, { target: { value: mockMessage } });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);

      const errorMessage = screen.getByTestId("errorMessage");
      expect(errorMessage).toHaveTextContent(mockErrorMessage);
    });

    it("should show error message for template subject when saving with no template subject", () => {
      render(<PushEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";
      const mockErrorMessage = "Template Title is required.";

      const inputName = screen.getByTestId("name");
      const inputDescription = screen.getByTestId("description");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputDescription, {
        target: { value: mockDescription },
      });
      fireEvent.change(inputMessage, { target: { value: mockMessage } });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);

      const errorMessage = screen.getByTestId("errorMessage");
      expect(errorMessage).toHaveTextContent(mockErrorMessage);
    });

    it("should show error message for template subject when saving with no template subtitle", () => {
      render(<PushEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockMessage = "Mock Template Message";
      const mockErrorMessage = "Subtitle is required.";

      const inputName = screen.getByTestId("name");
      const inputSubject = screen.getByTestId("subject");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputMessage, {
        target: { value: inputMessage },
      });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);

      const errorMessage = screen.getByTestId("errorMessage");
      expect(errorMessage).toHaveTextContent(mockErrorMessage);
    });

    it("should show error message for template subject when saving with no template message", () => {
      render(<PushEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockErrorMessage = "Message is required.";

      const inputName = screen.getByTestId("name");
      const inputSubject = screen.getByTestId("subject");
      const inputDescription = screen.getByTestId("description");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputDescription, {
        target: { value: mockDescription },
      });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);

      const errorMessage = screen.getByTestId("errorMessage");
      expect(errorMessage).toHaveTextContent(mockErrorMessage);
    });
  });
});
