import { Navigate, Route, Routes } from "react-router";

import EqicScreen from "screens/eqic";
import KanbanScreen from "screens/kanban";
import { Link } from "react-router-dom";
import React from "react";

const ProjectScreen = () => {
  return (
    <div>
      ProjectScreen
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanbanScreen />}></Route>
        <Route path="/epic" element={<EqicScreen />}></Route>
        <Navigate to={window.location.pathname + "/kanban"}></Navigate>
      </Routes>
    </div>
  );
};

export default ProjectScreen;
