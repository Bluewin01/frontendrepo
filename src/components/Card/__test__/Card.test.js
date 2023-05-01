import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Card } from "../Card";

describe("Component: Card", () => {
  it("card renders correctly", () => {
    const tree = renderer.create(<Card></Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
