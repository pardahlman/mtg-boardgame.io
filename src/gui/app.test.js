import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { shallow } from "enzyme";
import { disableLogging } from "../test-setup";

it(
  "renders without crashing",
  disableLogging(() => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  })
);

it(
  "renders 2 players",
  disableLogging(() => {
    const { getByText } = render(<App />);
    expect(getByText("playerID - 0")).toBeInTheDocument();
    expect(getByText("playerID - 1")).toBeInTheDocument();
  })
);

it("renders 2 MtgClients", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.children().length).toBe(2);
});
