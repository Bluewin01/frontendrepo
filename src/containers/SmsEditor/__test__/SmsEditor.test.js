import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, fireEvent, act } from "@testing-library/react";
import { render } from "../../../utils/Utils";
import renderer from "react-test-renderer";
import store from "../../../store";
import { Provider } from "react-redux";
import SmsEditor from "../SmsEditor";
import { Modal } from "../../../components/Modal/Modal";

jest.useFakeTimers();

describe("Containers: SMS Editor", () => {
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
            <SmsEditor />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should be able to render email page with error", () => {
      render(<SmsEditor />, {
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
      render(<SmsEditor />, {
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
      render(<SmsEditor />);
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
      render(<SmsEditor />);
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

    it("should can be test send the template after input all fields", async () => {
      render(<SmsEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";
      const mockRecipient = "Mock Recipient";

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

      const recipient = screen.getAllByRole("textbox")[0];
      const subject = screen.getAllByRole("textbox")[1];

      fireEvent.change(recipient, {
        target: { value: mockRecipient },
      });

      const confirmButton = screen.getAllByRole("button")[0];
      fireEvent.click(confirmButton);

      expect(sendButton).toHaveTextContent("Test");
      expect(confirmButton).toHaveTextContent("Send SMS");
    });

    it("should can be edit the template", async () => {
      render(<SmsEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";
      const mockRecipient = "Mock Recipient";

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

      const recipient = screen.getAllByRole("textbox")[0];
      const subject = screen.getAllByRole("textbox")[1];

      fireEvent.change(recipient, {
        target: { value: mockRecipient },
      });

      const confirmButton = screen.getAllByRole("button")[0];
      fireEvent.click(confirmButton);

      expect(sendButton).toHaveTextContent("Test");
      expect(confirmButton).toHaveTextContent("Send SMS");
    });

    it("should be redirect to /home route when click cancel button", () => {
      render(<SmsEditor />);
      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      expect(
        screen.getByText("All changes will be lost. Are you sure to continue?")
      ).toBeInTheDocument();

      const confirmButton = screen.getByText("Confirm");
      fireEvent.click(confirmButton);
      expect(global.window.location.href).toContain("/home");
    });

    it("should be shown the cancel modal pop-up", () => {
      render(<SmsEditor />);
      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      expect(
        screen.getByText("All changes will be lost. Are you sure to continue?")
      ).toBeInTheDocument();
    });

    it("should be able to save with template object and redirect to home page", async () => {
      render(<SmsEditor />, {
        preloadedState: {
          Template: {
            error: null,
            response: null,
            templateObject: {
              name: "fakeName",
              subject: "fakeSubject",
              description: "fakeDescription",
              value: "fakeMessage",
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
      render(<SmsEditor />);
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
      render(<SmsEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockDescription = "Mock Template Description";
      const mockMessage = "Mock Template Message";
      const mockErrorMessage = "Template Subject is required.";

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

    it("should show error message for template subject when saving with no template message", () => {
      render(<SmsEditor />);
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
    it("should show error message for template subject when saving with no template description", () => {
      render(<SmsEditor />);
      const mockTemplateName = "Mock Template Name";
      const mockSubject = "Mock Template Subject";
      const mockMessage = "Mock Template Message";
      const mockErrorMessage = "Template Description is required.";

      const inputName = screen.getByTestId("name");
      const inputSubject = screen.getByTestId("subject");
      const inputMessage = screen.getByTestId("message");

      fireEvent.change(inputName, { target: { value: mockTemplateName } });
      fireEvent.change(inputSubject, { target: { value: mockSubject } });
      fireEvent.change(inputMessage, {
        target: { value: mockMessage },
      });

      const saveButton = screen.getByTestId("showSaveModal");
      fireEvent.click(saveButton);

      const confirmButton = screen.getByTestId("triggerHandler");
      fireEvent.click(confirmButton);

      const errorMessage = screen.getByTestId("errorMessage");
      expect(errorMessage).toHaveTextContent(mockErrorMessage);
    });
    it("should go to homepage when click cancel", () => {
      render(<SmsEditor />);
      const mockButton = screen.getAllByRole("button")[2];
      expect(mockButton).toBeDefined();
      expect(mockButton).toHaveTextContent("Cancel");
      fireEvent.click(mockButton);
      render(
        <Modal
          headerTitle={`All changes will be lost. Are you sure to continue?`}
          showBody={false}
          buttons={[
            {
              name: "Confirm",
              color: "danger",
            },
            {
              name: "Cancel",
              color: "light",
            },
          ]}
        />
      );
      const confirmButton = screen.findAllByText("Confirm");
      expect(confirmButton).toBeDefined();
    });
  });
});
