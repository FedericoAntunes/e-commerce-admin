import { useState, useEffect } from "react";
import apiCall from "./api/api";
import DeleteUserModal from "./partials/DeleteUserModal";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./partials/Header/Header";
import { Link } from "react-router-dom";

function UserPanel() {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actualUserId, setActualUserId] = useState({});
  const admin = useSelector((state) => state.user);

  const getUsers = async () => {
    const response = await apiCall("/users", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  function handleOpenDeleteModal(userId) {
    setActualUserId(userId);
    return setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  return (
    <>
      <Header />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="pl-20 pr-6 py-3 text-left">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
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
                      className="flex px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={
                          user.avatar.substring(0, 4) === "http"
                            ? user.avatar
                            : process.env.REACT_APP_SERVER_DOMAIN + user.avatar
                        }
                        alt="user-avatar"
                      />
                      <div key={user.id} className="pl-3">
                        <div className="text-base font-semibold">
                          {user.firstname} {user.lastname}
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="font-normal text-gray-500 text-center">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-center">
                      {user.username}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 "></div>{" "}
                        Online
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div>
                        <Link
                          to={`/edit-user/${user.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Edit user
                        </Link>
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
                          actualUserId={actualUserId}
                          isDeleteModalOpen={isDeleteModalOpen}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          users={users}
                          setUsers={setUsers}
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
    </>
  );
}

export default UserPanel;
