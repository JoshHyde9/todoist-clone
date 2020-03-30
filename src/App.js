import React from "react";

// Components
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";

// Styles
import "./scss/App.css";

export const App = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
};
