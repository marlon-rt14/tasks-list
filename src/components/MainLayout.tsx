import React from "react";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
