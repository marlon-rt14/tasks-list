import React, { useEffect, useState } from "react";
import { ITask } from "../interfaces/ITasks";
import { apiAdmin } from "../helpers/Auth8Base";
import { TASKS, TASKS_LIST_FILTER, TASKS_LIST_USER_FILTER } from "../graphql/queries/tasks";
import { useErrorHandler } from "./useErrorHandler";

interface IFilters {
  name: string;
  idUser: any;
}

export const useTasks = (filters: IFilters) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const { validateError } = useErrorHandler();

  /* This is a custom hook called `useTasks` that takes in a `filters` object as a parameter. It uses the
`useState` hook to initialize the `tasks` state to an empty array and the `loading` state to
`false`. */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await apiAdmin.query(TASKS_LIST_FILTER, filters);
        //   const response = await apiAdmin.query(TASKS_LIST_USER_FILTER, filters);
        // console.log("reponse", response.data?.tasksList);
        if (response.errors) throw response;
        setLoading(false);
        if (response.data?.tasksList?.items) {
          const data = response.data.tasksList.items.map((task: ITask, index: number) => ({
            ...task,
            no: index + 1,
          }));
          setTasks(data);
        }
      } catch (error) {
        setLoading(false);
        validateError(error);
      }
    })();
  }, [filters.name]);

  return {
    tasks,
    loading,
    setTasks,
  };
};
