import { useState, useEffect } from "react";
import apiCall from "./api/api";
import DeleteCompanyModal from "./partials/DeleteCompanyModal";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./partials/Header/Header";
import { Link } from "react-router-dom";
import ScrollToTop from "./partials/ScrollToTop";
import SpinnerLoader from "./partials/loaders/SpinnerLoader";

function CompanyPanel() {
  const [companies, setCompanies] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [actualCompanyId, setActualCompanyId] = useState({});
  const admin = useSelector((state) => state.user);

  const getCompanies = async () => {
    const response = await apiCall("/companies", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setCompanies(response);
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line
  }, []);

  function handleOpenDeleteModal(companyId) {
    setActualCompanyId(companyId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  return (
    <>
      <Header />
      {companies ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
          <div className="flex justify-end my-10 m-6">
            <Link
              to="/create-company"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Add Company
            </Link>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-black  bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide pl-20 pr-6 py-3 w-1/5"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide pl-6 pr-6 py-3 text-center"
                >
                  Background
                </th>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide px-6 py-3 text-center w-3/5"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide px-6 py-3"
                >
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
                      <th scope="row" className="">
                        <div className="flex">
                          <img
                            className="w-10 h-10 rounded-full mx-2 my-auto"
                            src={
                              company.logo.substring(0, 4) === "http"
                                ? company.logo
                                : process.env.REACT_APP_IMAGE_BASEURL +
                                  company.logo
                            }
                            alt="company"
                          />
                          <span className="my-auto px-2">
                            <p className="font-semibold leading-7 tracking-wide text-base">
                              {company.name}
                            </p>
                          </span>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <img
                          className="w-16 h-16 mx-auto rounded-lg"
                          src={
                            company.background.substring(0, 4) === "http"
                              ? company.background
                              : process.env.REACT_APP_IMAGE_BASEURL +
                                company.background
                          }
                          alt="company"
                        />
                      </td>
                      <td className="px-6 py-4 max-w-[500px]">
                        {company.description === "" ? (
                          <p className=" text-left font-semibold leading-7 tracking-wide">
                            No description.
                          </p>
                        ) : (
                          <p className=" text-left truncate font-semibold leading-7 tracking-wide">
                            {company.description}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/edit-company/${company.slug}`}
                          className="font-medium text-blue-600 hover:underline text-left"
                        >
                          Edit company
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(company.id)}
                          className="font-medium text-red-600 hover:underline mt-2 text-left"
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
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-60">
          <SpinnerLoader />
        </div>
      )}
      <ScrollToTop />
    </>
  );
}

export default CompanyPanel;
