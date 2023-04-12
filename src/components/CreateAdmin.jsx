import { useState } from "react";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function CreateAdmin() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const admin = useSelector((state) => state.user);
  const navigate = useNavigate();

  async function handleCreateAdmin(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    const response = await apiCall(`/admins`, "post", formData, {
      Authorization: `Bearer ${admin.token}`,
      "Content-Type": "multipart/form-data",
    });

    if (response === "Admin email already exist.") {
      return toast.warn("This admin email already exist.", {
        position: "bottom-right",
      });
    }
    if (response === "Admin username already exist.") {
      return toast.warn("This admin username already exist.", {
        position: "bottom-right",
      });
    }
    if (response === "Fill all the fields.") {
      return toast.warn("Please, fill all the fields.", {
        position: "bottom-right",
      });
    }
    if (response === "Admin created.") {
      setFirstname("");
      setLastname("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
    return navigate("/admin-panel");
  }

  return (
    <>
      <div className="h-fit w-fit m-auto mt-10 h-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
        <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
          <form
            onSubmit={handleCreateAdmin}
            className="relative bg-white rounded-lg shadow "
          >
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Create Admin Account
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-firstname"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Firstname
                  </label>
                  <input
                    id="admin-firstname"
                    type="text"
                    name="admin-firstname"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-lastname"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Lastname
                  </label>
                  <input
                    id="admin-lastname"
                    type="text"
                    name="admin-lastname"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-avatar"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Avatar
                  </label>
                  <input
                    id="admin-avatar"
                    type="file"
                    name="admin-avatar"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => {
                      setAvatar(event.target.files[0]);
                    }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="text"
                    name="admin-email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    id="admin-username"
                    type="text"
                    name="admin-username"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admin-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="text"
                    name="admin-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <Link
                to="/admin-panel"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => (
                  // eslint-disable-next-line
                  setFirstname(""),
                  setLastname(""),
                  setAvatar(""),
                  setEmail(""),
                  setUsername(""),
                  setPassword("")
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
            </div>
          </form>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-gray-200"></div>
    </>
  );
}

export default CreateAdmin;
