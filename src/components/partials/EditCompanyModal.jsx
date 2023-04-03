import { useState } from "react";
import apiCall from "../api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function EditCompanyModal({
  company,
  actualCompanyId,
  isEditModalOpen,
  setIsEditModalOpen,
  refresh,
  setRefresh,
}) {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [background, setBackground] = useState(company.background);
  const [logo, setLogo] = useState(company.logo);

  const admin = useSelector((state) => state.user);

  async function handleEditCompany(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("background", background);
    formData.append("logo", logo);

    const response = await apiCall(
      `/companies/${actualCompanyId}`,
      "patch",
      formData,
      {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    if (response === "Unavailable comapany name") {
      return toast.warn("Unavailable comapany name.", {
        position: "bottom-right",
      });
    }
    if (response === "Company updated") {
      setRefresh(!refresh);
    }
    return setIsEditModalOpen(!isEditModalOpen);
  }

  return (
    <>
      {isEditModalOpen && actualCompanyId === company.id ? (
        <>
          <div className="h-fit w-fit m-auto mt-10 h-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
            <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
              <form
                onSubmit={handleEditCompany}
                className="relative bg-white rounded-lg shadow "
              >
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit Company
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={() => (
                      // eslint-disable-next-line
                      setIsEditModalOpen(),
                      setName(company.name),
                      setDescription(company.description),
                      setBackground(company.background),
                      setLogo(company.logo)
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
                        htmlFor="company-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        name="company-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.name}`}
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
                      <input
                        id="company-description"
                        type="text"
                        name="company-description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.description}`}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-image"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Logo
                      </label>
                      <input
                        id="company-image"
                        type="file"
                        name="company-image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.logo}`}
                        onChange={(event) => setLogo(event.target.files[0])}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-logo"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Background
                      </label>
                      <input
                        id="company-logo"
                        type="file"
                        name="company-logo"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.background}`}
                        onChange={(event) =>
                          setBackground(event.target.files[0])
                        }
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
            onClick={() => setIsEditModalOpen()}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
    </>
  );
}

export default EditCompanyModal;
