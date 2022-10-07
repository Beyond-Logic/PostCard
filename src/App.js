/** @format */

import React from "react";
import "./global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Container from "./components/Container";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Router>
        <Container>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
