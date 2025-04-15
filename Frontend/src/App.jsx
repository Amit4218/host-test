import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Info from "./components/Info";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}

export default App;
