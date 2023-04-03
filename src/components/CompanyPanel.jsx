import { useState, useEffect } from "react";
import apiCall from "./api/api";
import EditCompanyModal from "./partials/EditCompanyModal";
import DeleteCompanyModal from "./partials/DeleteCompanyModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./partials/SideBar";
import { useSelector } from "react-redux";
import CreateCompanyModal from "./partials/CreateCompanyModal";

function CompanyPanel() {
  const [companies, setCompanies] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
    // eslint-disable-next-line
  }, [refresh]);

  function handleOpenEditModal(companyId) {
    setActualCompanyId(companyId);
    setIsEditModalOpen(!isEditModalOpen);
  }
  function handleOpenDeleteModal(companyId) {
    setActualCompanyId(companyId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  function handleOpenCreateModal() {
    setIsCreateModalOpen(!isCreateModalOpen);
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
              id="table-search-company"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for company"
            />
          </div>
        </div>
        <div className="flex justify-end m-10">
          <button
            onClick={() => handleOpenCreateModal()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Add Company
          </button>
          {
            <CreateCompanyModal
              isCreateModalOpen={isCreateModalOpen}
              setIsCreateModalOpen={setIsCreateModalOpen}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="pl-20 pr-6 py-3 text-center w-1/5">
                Company
              </th>
              <th scope="col" className="pl-6 pr-6 py-3 text-center">
                Background
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
                companies && (
                  <tr
                    key={company.id}
                    className="bg-white border-b hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="flex h-full justify-center items-center px-6 py-4 text-gray-900 "
                    >
                      <img
                        className="w-16 h-16"
                        src={
                          company.logo.substring(0, 4) === "http"
                            ? company.logo
                            : process.env.REACT_APP_SERVER_DOMAIN + company.logo
                        }
                        alt="company-logo"
                      />
                      <div key={company.id} className="pl-3">
                        <div className="text-base font-semibold">
                          {company.name}
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="font-normal text-gray-500 text-center">
                        <img
                          className="w-16 h-16"
                          src={
                            company.background.substring(0, 4) === "http"
                              ? company.background
                              : process.env.REACT_APP_SERVER_DOMAIN +
                                company.background
                          }
                          alt="company-background"
                        />{" "}
                      </div>
                    </td>
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
                          onClick={() => handleOpenEditModal(company.id)}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Edit company
                        </button>
                        <EditCompanyModal
                          company={company}
                          actualCompanyId={actualCompanyId}
                          isEditModalOpen={isEditModalOpen}
                          setIsEditModalOpen={setIsEditModalOpen}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />
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

export default CompanyPanel;
