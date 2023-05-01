import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { ErrorMessage } from "../ErrorMessage";

describe("Component: Error Message", () => {
  it("error message component renders correctly", () => {
    const tree = renderer.create(<ErrorMessage></ErrorMessage>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
