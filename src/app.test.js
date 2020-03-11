import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const disableLogging = testCase => () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "group").mockImplementation(() => {});
  testCase();
  jest.restoreAllMocks();
};

it(
  "renders without crashing",
  disableLogging(() => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  })
);
