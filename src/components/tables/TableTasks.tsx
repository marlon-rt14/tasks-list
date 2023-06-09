import React, { useEffect, useState } from "react";
import { Button, Input, InputPicker, Message, Table, useToaster } from "rsuite";
import { apiAdmin } from "../../helpers/Auth8Base";
import { useTasks } from "../../hooks/useTasks";
import { MdlTask } from "../modals/MdlTask";
import { ITask } from "../../interfaces/ITasks";
import { useAuthStore } from "../../store/AuthStore";
import { UPDATE_TASK } from "../../graphql/mutations/tasks";

const { Column, HeaderCell, Cell } = Table;

const STATES = [
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Completed", value: "Completed" },
];

const INITIAL_FILTERS = {
  name: "",
  idUser: "",
};

export const TableTasks = () => {
  // STATES
  const [isOpenMdl, setIsOpenMdl] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [name, setName] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITask>();

  // CUSTOM HOOKS
  /* Using the custom hook `useTasks` to retrieve tasks data from an API based on the provided filters,
and returning the tasks data, a loading state, and a function to update the tasks data. */
  const { user } = useAuthStore();
  const toaster = useToaster();
  const { tasks, loading, setTasks } = useTasks({ ...filters, idUser: [user.id] });

  const handleChangeName = () => {
    setTimeout(() => {
      setName((prevName) => {
        setFilters((prevFilters) => ({ ...prevFilters, name: prevName }));
        return prevName;
      });
    }, 500);
  };

  const handleChangeState = async (state: string, rowData: ITask) => {
    const response = await apiAdmin.mutation(UPDATE_TASK, {
      id: rowData.id,
      state,
    });
    if (response.errors) throw response.errors;
    if (response.data) {
      setTasks((prev) => {
        return prev.map((t) => (t.id === rowData.id ? { ...t, ...response.data!.taskUpdate } : t));
      });
      toaster.push(
        <Message showIcon closable type="success">
          Task updated successfully
        </Message>
      );
    }
  };

  return (
    <div className="container">
      {/* `<MdlTask>` is a custom modal component that is being used to display a form for adding or
      editing a task. */}
      <MdlTask
        isOpen={isOpenMdl}
        task={selectedTask}
        setTasks={setTasks}
        onClose={() => setIsOpenMdl(false)}
      />
      <div className="d-flex w-100 justify-content-between">
        <div className="my-3 ">
          <Input
            type="text"
            className="w-100"
            placeholder="Search by Name"
            value={name}
            onChange={(value) => {
              setName(value);
              handleChangeName();
            }}
          />
        </div>
        <div className="my-3">
          <Button
            appearance="primary"
            onClick={() => {
              setIsOpenMdl(true);
              setSelectedTask(undefined);
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
      <Table autoHeight data={tasks} id="table" cellBordered bordered wordWrap loading={loading}>
        <Column width={50} align="center">
          <HeaderCell>No</HeaderCell>
          <Cell dataKey="no" />
        </Column>

        <Column flexGrow={1.5}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey="description" />
        </Column>

        <Column flexGrow={1.5}>
          <HeaderCell>State</HeaderCell>
          <Cell>
            {(rowData: any) => {
              return (
                <InputPicker
                  data={STATES}
                  value={rowData.state}
                  cleanable={false}
                  onChange={(value) => handleChangeState(value, rowData)}
                />
              );
            }}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Actions</HeaderCell>
          <Cell className="text-center">
            {(rowData: any) => {
              return (
                <i
                  className="bi bi-pencil-square fw-bold fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsOpenMdl(true);
                    setSelectedTask(rowData);
                  }}
                ></i>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};
