import apiCall from "../api/api";

function DeleteUserModal({
  user,
  actualUser,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  users,
  setUsers,
}) {
  async function handleUserDelete(userId) {
    await apiCall(`/users/${userId}`, "delete");
    setUsers(users.filter((user) => user.id !== userId));
    return setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  return (
    <>
      {isDeleteModalOpen && actualUser === user.id ? (
        <>
          <div className="m-auto h-auto h-fit w-fit fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto mt-10">
            <div className="relative w-auto mx-auto h-full max-w-2xl md:h-auto bg-white rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Delete user
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={() => setIsDeleteModalOpen()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="p-6 space-x-2 border-t border-gray-200 rounded-b">
                <p className="text-sm font-medium text-gray-900">
                  Warning, you are about to delete {user.firstname}{" "}
                  {user.lastname}
                  ´s account.
                </p>
                <div className="flex border-t border-gray-200 mt-4 p-2">
                  <button
                    onClick={() => setIsDeleteModalOpen()}
                    type="submit"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUserDelete(actualUser)}
                    type="submit"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
                  >
                    Delete user
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setIsDeleteModalOpen()}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
    </>
  );
}

export default DeleteUserModal;
