import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SigninPage } from "../pages/auth/SigninPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { NotFounPage } from "../templates/NotFounPage";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFounPage />} />
    </Routes>
  );
};
