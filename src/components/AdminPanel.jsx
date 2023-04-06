import { useState, useEffect } from "react";
import apiCall from "./api/api";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./partials/Header/Header";
import { Link } from "react-router-dom";
import ScrollToTop from "./partials/ScrollToTop";

function AdminPanel() {
  const [admins, setAdmins] = useState([]);
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
        <div className="flex justify-end m-10">
          <Link
            to={"/create-admin"}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Create Admin
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="pl-20 pr-6 py-3 text-left">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-center">
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
                    <th
                      scope="row"
                      className="flex px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div key={admin.id} className="pl-3">
                        <div className="text-base font-semibold">
                          {admin.firstname} {admin.lastname}
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="font-normal text-gray-500 text-center">
                        {admin.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-center">
                      {admin.username}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 "></div>{" "}
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
      <ScrollToTop />
    </>
  );
}

export default AdminPanel;
