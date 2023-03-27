import { useState, useEffect } from "react";
import apiCall from "./api/api";
import EditUserModal from "./partials/EditUserModal";
import DeleteUserModal from "./partials/DeleteUserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actualUser, setActualUser] = useState({});

  const notify = () =>
    toast.warn("This feature is not included yet.", {
      position: "bottom-right",
    });

  const getUsers = async () => {
    const response = await apiCall("/users", "get");
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  function handleOpenModal(userId) {
    setActualUser(userId);
    setIsEditModalOpen(!isEditModalOpen);
  }
  function handleOpenDeleteModal(userId) {
    setActualUser(userId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div onClick={notify} className="py-4 bg-white ml-10">
        <label for="table-search" className="sr-only">
          Search
        </label>
        <ToastContainer />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Admin
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              user && (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-200"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${user.avatar}`}
                      alt="user-avatar"
                    />
                    <div key={user.id} className="pl-3">
                      <div className="text-base font-semibold">
                        {user.firstname} {user.lastname}
                      </div>
                    </div>
                  </th>
                  <td>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-10 py-4 text-red-700">x</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(user.id)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit user
                      </button>
                      <EditUserModal
                        user={user}
                        actualUser={actualUser}
                        isEditModalOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDeleteModal(user.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete user
                      </button>
                      <DeleteUserModal
                        user={user}
                        actualUser={actualUser}
                        isDeleteModalOpen={isDeleteModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                      />
                    </div>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
