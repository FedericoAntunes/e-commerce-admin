import { useState, useEffect } from "react";
import apiCall from "./api/api";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./partials/Header/Header";
import { Link } from "react-router-dom";
import ScrollToTop from "./partials/ScrollToTop";
import SpinnerLoader from "./partials/loaders/SpinnerLoader";

function AdminPanel() {
  const [admins, setAdmins] = useState(null);
  const admin = useSelector((state) => state.user);

  const getAdmins = async () => {
    const response = await apiCall("/admins", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setAdmins(response);
  };

  useEffect(() => {
    getAdmins();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      {admins ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
          <div className="flex justify-end my-10 m-6">
            <Link
              to={"/create-admin"}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Create Admin
            </Link>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide pl-20 pr-6 py-3 text-left"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => {
                return (
                  admin && (
                    <tr
                      key={admin.id}
                      className="bg-white border-b hover:bg-gray-200"
                    >
                      <th scope="row" className="flex px-6 py-4">
                        <div key={admin.id} className="pl-3">
                          <div>
                            <p className="text-base font-semibold leading-7 tracking-wide">
                              {admin.firstname} {admin.lastname}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td>
                        <div className="font-semibold leading-7 tracking-wide text-center">
                          {admin.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold leading-7 tracking-wide text-center">
                        {admin.username}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center font-semibold leading-7 tracking-wide">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 "></div>
                          Online
                        </div>
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

export default AdminPanel;
