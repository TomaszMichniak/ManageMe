import { useEffect, useState } from "react";
import { Task } from "../types/taskType";
import { User } from "../types/userType";
import { UserService } from "../service/userService";
import TaskForm from "./form/taskForm";
import SetUserTaskForm from "./form/setUserTaskForm";
import { TaskService } from "../service/taskService";
import moment from "moment";
import { Status } from "../types/enums/statusEnum";

interface Props {
  task: Task;
  closeMenu: () => void;
  handleDelete: (taskId: number) => void;
}

export default function TaskDetails({ task, closeMenu, handleDelete }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [userMode, setUserMode] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (task.userId != undefined) {
        const data = await UserService.getUserById(task.userId);
        if (data != undefined) {
          setUser(data);
        }
      }
    })();
  }, []);
  const handleSetUser = () => {
    setUserMode(!userMode);
  };
  const handleUpdateUser = (userId: number) => {
    task.userId = userId;
    task.startDate = moment().format("DD-MM-YYYY HH:mm");
    TaskService.setToDoing(task);
    setUserMode(false);
    closeMenu();
  };
  const handleSetToDone = (task: Task) => {
    task.endDate = moment().format("DD-MM-YYYY HH:mm");
    TaskService.setToDone(task);
    closeMenu();
  };
  const handleUpdate = async (updatedTask: Task) => {
    TaskService.updateTask(updatedTask);
    setEditingMode(false);
    closeMenu();
  };

  return (
    <div className="background-form w-screen  h-screen fixed top-0 left-0">
      <div className=" flex h-screen w-11/12 max-w-screen-md items-center mx-auto ">
        <div className="bg-gray-200 mx-auto rounded-xl w-full py-">
          <div className="text-right">
            <button
              onClick={closeMenu}
              className=" text-white text-xl font-bold bg-gradient-to-r from-rose-500 to-red-500 p-4"
            >
              X
            </button>
          </div>
          <div className="text-center p-3 text-xl">
            <p className="mx-auto my-auto font-bold mb-5 text-2xl">
              {task.description}
            </p>
            <p className="py-1">Priority task: {task.priority}</p>
            <p className="py-1">Creation date: {task.addDate}</p>
            {task.startDate && (
              <p className="py-1">Start date: {task.startDate}</p>
            )}
            {task.endDate && <p className="py-1">End date: {task.endDate}</p>}
            {task.userId && (
              <p className="py-1">
                Task performer: {user?.firstName} {user?.lastName}
              </p>
            )}
              <div className="m-5">
            {task.status != Status.done && (
              <button
                className="mt-2 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold py-1 px-2 rounded"
                onClick={() => setEditingMode(true)}
              >
                Edit task
              </button>
            )}
              {task.status == Status.doing && (
                <button
                  className="ml-1 mt-2 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleSetToDone(task)}
                >
                  Set done
                </button>
              )}
              {task.status != Status.done && (
                <button
                  className="ml-1 mt-2 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleSetUser()}
                >
                  Set user
                </button>
              )}
              {task.status != Status.done && (
                <button
                  className="ml-1 mt-2 bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {userMode && (
        <SetUserTaskForm
          setUser={handleUpdateUser}
          handleCloseMenu={handleSetUser}
        />
      )}
      {editingMode && (
        <TaskForm
          handleCloseCreateMenu={() => setEditingMode(false)}
          handleCreate={handleUpdate}
          task={task!}
          storyId={task.storyId}
        />
      )}
    </div>
  );
}
