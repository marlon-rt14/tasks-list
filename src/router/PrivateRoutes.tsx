import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SigninPage } from "../pages/auth/SigninPage";
import { Navbar } from "rsuite";
import { NotFounPage } from "../templates/NotFounPage";
import { MainLayout } from "../components/MainLayout";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFounPage />} />
      </Route>
    </Routes>
  );
};
