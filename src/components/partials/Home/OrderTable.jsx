import { useState, useEffect } from "react";
import apiCall from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function OrderTable() {
  const [oreders, setOrders] = useState([]);
  const admin = useSelector((state) => state.user);

  const notify = () =>
    toast.warn("This feature is not included yet.", {
      position: "bottom-right",
    });

  const getOrders = async () => {
    const response = await apiCall("/orders", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setOrders(response);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="my-10 relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <h1>Latest orders</h1>
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
              id="table-search-orders"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for orders"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Satus
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody>
            {oreders.map((order) => {
              return (
                order && (
                  <tr
                    key={order.id}
                    className="bg-white border-b hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="flex items-center justify-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div key={order.id} className="pl-3">
                        <div className="text-base font-semibold">
                          {order.status}
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="font-normal text-gray-500 text-center">
                        $ {order.total_price}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-center">
                      <ul>
                        <li>city: {order.address.city}</li>
                        <li>address: {order.address.address}</li>{" "}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.payment_method}
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

export default OrderTable;
