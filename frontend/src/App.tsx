import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Landing from "./views/Landing";
import Projects from "./views/Projects";
import Visions from "./views/Visions";
import Login from "./views/Login";
import AddProject from "./views/AddProject";
import Register from "./views/Register";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import EditProject from "./views/EditProject";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects">
            <Route path="" element={<Projects />} />
            <Route path="add" element={<AddProject />} />
            <Route path=":projectId">
              <Route path="edit" element={<EditProject />} />
            </Route>
          </Route>
          <Route path="/visions" element={<Visions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
