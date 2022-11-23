import { Box } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/AuthPage/AuthPage";
import TestPage from "./components/ViewingPage/testPage";
import ViewingPage from "./components/ViewingPage/ViewingPage";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#424549",
        minHeight: "100vh",
        padding: "50px 0px",
      }}
    >
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/posts" element={<ViewingPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Box>
  );
}

export default App;
