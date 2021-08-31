import "./App.css";

import { AuthenticatedApp } from "./authenticates-app";
// import {LoginPage} from './screens/login'
import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const token = localStorage.getItem("__auth_provider_key__");
  return (
    <div className="App">
      {token ? (
        <AuthenticatedApp></AuthenticatedApp>
      ) : (
        <UnauthenticatedApp></UnauthenticatedApp>
      )}
      {/* <AuthenticatedApp></AuthenticatedApp> */}
      {/* <UnauthenticatedApp></UnauthenticatedApp> */}
    </div>
  );
}

export default App;
