import React from "react";

// Context
import { ProjectsProvider, SelectedProjectProvider } from "./context";

// Components
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";

// Styles
import "./scss/App.css";

export const App = () => {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div>
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
