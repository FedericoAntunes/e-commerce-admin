import { useState } from "react";
import apiCall from "../api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function CreateAdminModal({
  isCreateModalOpen,
  setIsCreateModalOpen,
  refresh,
  setRefresh,
}) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const admin = useSelector((state) => state.user);

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
      setRefresh(!refresh);
    }
    return setIsCreateModalOpen(!isCreateModalOpen);
  }

  return (
    <>
      {isCreateModalOpen ? (
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
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={() => (
                      setIsCreateModalOpen(),
                      setFirstname(""),
                      setLastname(""),
                      setAvatar(""),
                      setEmail(""),
                      setUsername(""),
                      setPassword("")
                    )}
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
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="comapany-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Firstname
                      </label>
                      <input
                        id="comapany-name"
                        type="text"
                        name="comapany-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => setFirstname(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Lastname
                      </label>
                      <input
                        id="company-description"
                        type="text"
                        name="company-description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => setLastname(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-avatar"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Avatar
                      </label>
                      <input
                        id="company-avatar"
                        type="file"
                        name="company-avatar"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => {
                          setAvatar(event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        id="company-email"
                        type="text"
                        name="company-email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        id="company-email"
                        type="text"
                        name="company-email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        id="company-email"
                        type="text"
                        name="company-email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
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
          <div
            onClick={() => setIsCreateModalOpen()}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
    </>
  );
}

export default CreateAdminModal;
