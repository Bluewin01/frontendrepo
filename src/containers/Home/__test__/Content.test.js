import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import store from "../../../store";
import { Provider } from "react-redux";
import { render, fireEvent, screen, act } from "../../../utils/Utils";
import Content from "../Content";
import * as ACTIONS from "../../../store/Template/TemplateActions";

describe("Containers: Content", () => {
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

  it("should be render correctly", () => {
    const mockUseState = () => jest.fn();
    const initiateViewTemplate = [
      {
        setSelectedTemplateId: mockUseState,
      },
    ];

    const tree = renderer
      .create(
        <Provider store={store}>
          <Content
            templateType="Email"
            templateList={[]}
            initiateViewTemplate={initiateViewTemplate}
          />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should be redirect to /email route when click plus icon", () => {
    render(<Content />);

    const createTemplate = screen.getByTestId("createTemplate");
    fireEvent.click(createTemplate);

    expect(global.window.location.href).toContain("/email");
  });

  it("should be redirect to /sms route when click plus icon", () => {
    render(<Content />, {
      preloadedState: { Template: { templateType: "Sms", templateList: [] } },
    });

    const createTemplate = screen.getByTestId("createTemplate");
    fireEvent.click(createTemplate);

    expect(global.window.location.href).toContain("/sms");
  });

  it("should be redirect to /push route when click plus icon", () => {
    render(<Content />, {
      preloadedState: { Template: { templateType: "Push", templateList: [] } },
    });

    const createTemplate = screen.getByTestId("createTemplate");
    fireEvent.click(createTemplate);

    expect(global.window.location.href).toContain("/push");
  });

  it("should be redirect to /email route when click Edit button", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(global.window.location.href).toContain("/email");
  });

  it("should be redirect to /sms route when click Edit button", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Sms",
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

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(global.window.location.href).toContain("/sms");
  });

  it("should be redirect to /push route when click Edit button", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Push",
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

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(global.window.location.href).toContain("/push");
  });

  it("should be shown modal with text: Are you sure to delete Email template? when click delete button", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(
      screen.getByText("Are you sure to delete Email template?")
    ).toBeInTheDocument();
  });

  it("should be triggered deleteTemplateRequest action when click confirm for delete", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    const deleteTemplateRequest = jest.spyOn(ACTIONS, "deleteTemplateRequest");
    expect(deleteTemplateRequest).toBeDefined();
  });

  it("should be shown text: This feature is not available yet when click on Use Template button", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const useTemplateButton = screen.getByText("Use Template");
    fireEvent.click(useTemplateButton);

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  it("should not be shown confirm button when click cancel for delete", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    const confirmButton = screen.queryByText("Confirm");
    expect(confirmButton).not.toBeInTheDocument();
  });

  it("should be able to mouseEnter on card", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const card = screen.getByText("fakeName");
    fireEvent.mouseEnter(card);
  });

  it("should be able to mouseLeave on card ", () => {
    render(<Content />, {
      preloadedState: {
        Template: {
          templateType: "Email",
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

    const card = screen.getByText("fakeName");
    fireEvent.mouseLeave(card);
  });
});
