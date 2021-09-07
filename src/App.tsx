import "./App.css";

import { AuthenticatedApp } from "./authenticates-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
// import {LoginPage} from './screens/login'
import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const token = localStorage.getItem("__auth_provider_key__");
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {token ? (
          <AuthenticatedApp></AuthenticatedApp>
        ) : (
          <UnauthenticatedApp></UnauthenticatedApp>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
