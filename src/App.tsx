import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
const Test = () => {
  return <h1>ないよ</h1>;
};
export const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};