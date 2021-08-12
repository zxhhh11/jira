import "./App.css";

import { AuthenticatedApp } from "./authenticates-app";
// import {LoginPage} from './screens/login'
import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      <AuthenticatedApp></AuthenticatedApp>
      {/* <UnauthenticatedApp></UnauthenticatedApp> */}
    </div>
  );
}

export default App;
