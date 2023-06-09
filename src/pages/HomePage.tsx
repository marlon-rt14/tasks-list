import React from "react";
import { Button } from "rsuite";
import { useAuthStore } from "../store/AuthStore";
import { TableTasks } from "../components/tables/TableTasks";

export const HomePage = () => {
    const { user } = useAuthStore();
    
    // console.log('user', user)

  return (
    <div className="container mt-5">
      <TableTasks />
    </div>
  );
};
