import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Projects from "./views/Projects";
import Visions from "./views/Visions";
import AddEditProject from "./views/AddEditProject"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects">
            <Route path="" element={<Projects />} />
            <Route path="edit" element={<AddEditProject/>}/>
          </Route>
          <Route path="/visions" element={<Visions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
