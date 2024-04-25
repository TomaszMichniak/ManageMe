import { User } from "../../types/userType";
import { UserService } from "../../service/userService";
import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { Role } from "../../types/enums/roleEnum";
interface Props {
  setUser: (userId: number) => void;
  handleCloseMenu: () => void;
}
export default function SetUserTaskForm({ setUser, handleCloseMenu }: Props) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [userId, setUserId] = useState<number>(-1);
  useEffect(() => {
    (async () => {
      let data = UserService.getAllUsers();
      data = data.filter(
        (item) => item.role == Role.developer || item.role == Role.devops
      );
      setUsers(data);
    })();
  }, []);
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!(e.target.value == "-1")) {
      setUserId(parseInt(e.target.value));
    }
  };
  const handleSetUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId == -1) return;
    setUser(userId);
  };
  return (
    <div className="background-form w-screen h-full fixed top-0 left-0">
      <div className=" flex h-full w-11/12 items-center mx-auto ">
        <div className="bg-white rounded-xl mx-auto ">
          <div className="flex justify-center">
            <p className="mx-auto my-auto  text-xl">Set user to task</p>
            <button
              onClick={handleCloseMenu}
              className="text-white text-xl font-bold bg-gradient-to-r from-rose-500 to-red-500 p-4"
            >
              X
            </button>
          </div>
          <form onSubmit={handleSetUser}>
            <div className="p-5">
              <label htmlFor="userId">Users:</label>
              <select id="userId" className="my-1 shadow bg-white border rounded-lg w-full py-2 px-3 mr-4 " value={userId} onChange={handleUserChange}>
                <option key={"-1"} value={"-1"}>
                  ---
                </option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-2 px-4 rounded  "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
