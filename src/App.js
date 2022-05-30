import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./components/pages/HomePage";
import { LoginPage } from "./components/pages/LoginPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { Register } from "./components/pages/Register";
import { Footer } from "./components/templates/Footer";
import { Header } from "./components/templates/Header";

function App() {
  return (
    <React.Fragment>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </main>

      <Footer />
    </React.Fragment>
  );
}

export default App;
