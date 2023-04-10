import { useState, useEffect } from "react";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "./partials/loaders/SpinnerLoader";

function EditUser() {
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const admin = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await apiCall(`/users/${params.id}`, "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setUser(response);
    setFirstname(response.firstname);
    setLastname(response.lastname);
    setAvatar(response.avatar);
    setUsername(response.username);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  async function handleEditUser(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("avatar", avatar);

    const response = await apiCall(`/users/${user.id}`, "patch", formData, {
      Authorization: `Bearer ${admin.token}`,
      "Content-Type": "multipart/form-data",
    });
    if (response === "Unavailable username") {
      return toast.warn("Unavailable username.", {
        position: "bottom-right",
      });
    }
    if (response === "Unavailable user email") {
      return toast.warn("Unavailable user email.", {
        position: "bottom-right",
      });
    }

    return navigate("/user-panel");
  }

  return (
    <>
      {user.username && user.email ? (
        <>
          <div className="h-fit w-fit m-auto mt-10 h-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
            <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
              <form
                onSubmit={handleEditUser}
                className="relative bg-white rounded-lg shadow "
              >
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit user
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="user-firstname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        FirstName
                      </label>
                      <input
                        id="user-firstname"
                        type="text"
                        name="user-firstname"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.firstname}`}
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="user-lastname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        LastName
                      </label>
                      <input
                        id="user-lastname"
                        type="text"
                        name="user-lastname"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.lastname}`}
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="user-username"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        id="user-username"
                        type="text"
                        name="user-username"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.username}`}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="user-avatar"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Avatar
                      </label>
                      <input
                        id="user-avatar"
                        type="file"
                        name="user-avatar"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${user.avatar}`}
                        onChange={(event) => setAvatar(event.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <Link
                    to="/user-panel"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => (
                      // eslint-disable-next-line
                      setFirstname(user.firstname),
                      setLastname(user.lastname),
                      setUsername(user.username),
                      setAvatar(user.avatar)
                    )}
                  >
                    Return
                  </Link>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save all
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-gray-200"></div>
        </>
      ) : (
        <div className="mt-60">
          <SpinnerLoader />
        </div>
      )}
    </>
  );
}

export default EditUser;
