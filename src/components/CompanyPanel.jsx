import { useState, useEffect } from "react";
import apiCall from "./api/api";
import EditUserModal from "./partials/EditUserModal";
import DeleteCompanyModal from "./partials/DeleteCompanyModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./partials/SideBar";
import { useSelector } from "react-redux";

function UserPanel() {
  const [companies, setCompanies] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actualCompanyId, setActualCompanyId] = useState({});
  const [refresh, setRefresh] = useState(true);
  const admin = useSelector((state) => state.user);

  const notify = () =>
    toast.warn("This feature is not included yet.", {
      position: "bottom-right",
    });

  const getCompanies = async () => {
    const response = await apiCall("/companies", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setCompanies(response);
  };

  useEffect(() => {
    getCompanies();
  }, [refresh]);

  function handleOpenModal(companyId) {
    setActualCompanyId(companyId);
    setIsEditModalOpen(!isEditModalOpen);
  }
  function handleOpenDeleteModal(companyId) {
    setActualCompanyId(companyId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  return (
    <>
      <SideBar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div onClick={notify} className="m-auto py-4 bg-white w-fit">
          <label htmlFor="table-search" className="sr-only">
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
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
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
              <th scope="col" className="pl-20 pr-6 py-3 text-center">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-center w-3/5">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => {
              return (
                company && (
                  <tr
                    key={company.id}
                    className="bg-white border-b hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="flex items-center justify-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`${company.logo}`}
                        alt="company-logo"
                      />
                      <div key={company.id} className="pl-3">
                        <div className="text-base font-semibold">
                          {company.name}
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="font-normal text-gray-500 text-center py-4">
                        {company.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {" "}
                      <div>
                        <button
                          type="button"
                          onClick={() => handleOpenModal(company.id)}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Edit company
                        </button>
                        {/*<EditUserModal
                          company={company}
                          actualCompanyId={actualCompanyId}
                          isEditModalOpen={isEditModalOpen}
                          setIsEditModalOpen={setIsEditModalOpen}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />*/}
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(company.id)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Delete company
                        </button>
                        <DeleteCompanyModal
                          company={company}
                          actualCompanyId={actualCompanyId}
                          isDeleteModalOpen={isDeleteModalOpen}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          companies={companies}
                          setCompanies={setCompanies}
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