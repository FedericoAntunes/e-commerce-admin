import { useState } from "react";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function CreateCompany() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("");
  const [logo, setLogo] = useState("");

  const navigate = useNavigate();

  const admin = useSelector((state) => state.user);

  async function handleCreateCompany(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("background", background);
    formData.append("logo", logo);
    formData.append("slug", "");

    const response = await apiCall(`/companies`, "post", formData, {
      Authorization: `Bearer ${admin.token}`,
      "Content-Type": "multipart/form-data",
    });

    if (response === "Company name already exist.") {
      return toast.warn("This company name already exist.", {
        position: "bottom-right",
      });
    }
    if (response === "Fill all the fields.") {
      return toast.warn("Please, fill all the fields.", {
        position: "bottom-right",
      });
    }
    if (response === "Company stored.") {
      setName("");
      setDescription("");
      setBackground("");
      setLogo("");
    }
    return navigate("/company-panel");
  }

  return (
    <>
      <div className="h-fit w-fit m-auto mt-10 h-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
        <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
          <form
            onSubmit={handleCreateCompany}
            className="relative bg-white rounded-lg shadow "
          >
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Create Company
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="comapany-name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    id="comapany-name"
                    type="text"
                    name="comapany-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="company-description"
                    type="text"
                    name="company-description"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 h-20 overflow-y-scroll"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    style={{ resize: "none" }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-Background"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Background
                  </label>
                  <input
                    id="company-Background"
                    type="file"
                    name="company-Background"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => {
                      setBackground(event.target.files[0]);
                    }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-logo"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Logo
                  </label>
                  <input
                    id="company-logo"
                    type="file"
                    name="company-logo"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    onChange={(event) => setLogo(event.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              {" "}
              <Link
                to="/company-panel"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => (
                  // eslint-disable-next-line
                  setName(""),
                  setDescription(""),
                  setBackground(""),
                  setLogo("")
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

export default CreateCompany;
