import React, { useEffect, useState } from "react";
import { Button, Input, Message, Modal, useToaster } from "rsuite";
import { ITask, TaskState } from "../../interfaces/ITasks";
import useForm from "../../hooks/useForm";
import { apiAdmin } from "../../helpers/Auth8Base";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../../graphql/mutations/tasks";
import { useErrorHandler } from "../../hooks/useErrorHandler";

interface IProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  task?: ITask;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const INITAL_FORM = {
  name: "",
  description: "",
  state: TaskState.Pending,
};

export const MdlTask = ({ isOpen, onClose, task, setTasks }: IProps) => {
  // STATES
  const [loadingCreateUpdate, setLoadingCreateUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // CUSTOM HOOKS
  const { validateError } = useErrorHandler();
  const { form, onChange, updateForm } = useForm(INITAL_FORM);

  const handleClose = () => {
    onClose(false);
  };

  const toaster = useToaster();

  const handleDelete = async () => {
    /* This code block is handling the deletion of a task. It checks if there is a task object passed
    as a prop, and if so, it sets the `loadingDelete` state to `true` and sends a mutation request
    to delete the task using the `DELETE_TASK` mutation. If the response has any errors, it throws
    those errors, otherwise, it removes the deleted task from the `tasks` state using the `setTasks`
    function and displays a success message using the `toaster.push` function. Finally, it sets the
    `loadingDelete` state to `false`, closes the modal using the `handleClose` function, and if
    there is an error, it sets the `loadingDelete` state to `false` and displays the error message
    using the `validateError` function. */
    if (task) {
      try {
        setLoadingDelete(true);
        const response = await apiAdmin.mutation(DELETE_TASK, {
          id: task.id,
        });
        if (response.errors) throw response.errors;
        if (response.data) {
          setTasks((prev) => prev.filter((t) => t.id !== task.id));
          toaster.push(
            <Message showIcon closable type="success">
              Task deleted successfully
            </Message>
          );
        }
        setLoadingDelete(false);
        handleClose();
      } catch (error) {
        setLoadingDelete(false);
        validateError(error);
      }
    }
  };

  const handleSave = async () => {
    setLoadingCreateUpdate(true);
    /* This code block is handling the creation or update of a task. It first checks if there is a
   `task` object passed as a prop, and if so, it sends a mutation request to update the task using
   the `UPDATE_TASK` mutation. Otherwise, it sends a mutation request to create a new task using the
   `CREATE_TASK` mutation. If the response has any errors, it throws those errors, otherwise, it
   updates the `tasks` state with the new or updated task using the `setTasks` function and displays
   a success message using the `toaster.push` function. Finally, it sets the `loadingCreateUpdate`
   state to `false`, closes the modal using the `handleClose` function, and if there is an error, it
   sets the `loadingCreateUpdate` state to `false` and displays the error message using the
   `validateError` function. */
    try {
      if (task) {
        const response = await apiAdmin.mutation(UPDATE_TASK, {
          id: task.id,
          name: form.name,
          description: form.description,
        });
        if (response.errors) throw response.errors;
        if (response.data) {
          setTasks((prev) => {
            return prev.map((t) => (t.id === task.id ? { ...t, ...response.data!.taskUpdate } : t));
          });
          toaster.push(
            <Message showIcon closable type="success">
              Task updated successfully
            </Message>
          );
        }
      } else {
        const response = await apiAdmin.mutation(CREATE_TASK, {
          name: form.name,
          description: form.description,
        });
        if (response.errors) throw response.errors;
        if (response.data) {
          setTasks((prev) => {
            return [
              ...prev,
              {
                ...response.data!.taskCreate,
                no: prev[prev.length - 1] ? prev[prev.length - 1].no + 1 : 1,
              },
            ];
          });
          toaster.push(
            <Message showIcon closable type="success">
              Task created successfully
            </Message>
          );
        }
      }
      setLoadingCreateUpdate(false);
      handleClose();
    } catch (error) {
      setLoadingCreateUpdate(false);
      validateError(error);
    }
  };

  useEffect(() => {
    if (task) updateForm(task);
    else updateForm(INITAL_FORM);
  }, [task]);

  return (
    <Modal backdrop={"static"} keyboard={false} size="sm" open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <div className="px-2">
            <h6>{task ? "Update task" : "New task"}</h6>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-3 px-2">
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(value) => onChange(value, "name")}
            />
          </div>
          <Input
            as={"textarea"}
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={(value) => onChange(value, "description")}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end gap-3">
          <Button appearance="subtle" onClick={handleClose}>
            Close
          </Button>
          {task && (
            <Button
              appearance="primary"
              color="red"
              onClick={handleDelete}
              loading={loadingDelete}
              disabled={loadingDelete}
            >
              Delete
            </Button>
          )}
          <Button
            appearance="primary"
            onClick={handleSave}
            loading={loadingCreateUpdate}
            disabled={loadingCreateUpdate}
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
