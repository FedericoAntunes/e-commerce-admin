import { useState, useEffect } from "react";
import apiCall from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import format from "date-fns/format";

function OrderTable() {
  const [orders, setOrders] = useState([]);
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
      <div className="mx-4 mt-10 px-4 py-6 relative overflow-x-auto  bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          Latest 5 orders
        </h5>
        <div onClick={notify} className="m-auto py-4 w-fit">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>

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
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th
                scope="col"
                className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
              >
                Satus
              </th>
              <th
                scope="col"
                className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
              >
                Total Price
              </th>
              <th
                scope="col"
                className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
              >
                User
              </th>
              <th
                scope="col"
                className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
              >
                Payment Method
              </th>
              <th
                scope="col"
                className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
              >
                Created At
              </th>
              <th
                scope="col"
                className="font-bold leading-7 tracking-wide px-6 py-3 text-center"
              >
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return index > 4
                ? null
                : order && (
                    <tr
                      key={order.id}
                      className="bg-white border-b hover:bg-gray-200"
                    >
                      <th scope="row" className="px-6 py-4 text-center">
                        <div
                          key={order.id}
                          className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                        >
                          {order.status}
                        </div>
                      </th>
                      <td>
                        <div className="font-semibold leading-7 tracking-wide text-center">
                          $ {order.total_price.toFixed(2)}
                        </div>
                      </td>
                      <td className="flex items-center px-6 py-4 text-center">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            order.user.avatar.substring(0, 4) === "http"
                              ? order.user.avatar
                              : process.env.REACT_APP_SERVER_DOMAIN +
                                order.user.avatar
                          }
                          alt="user-avatar"
                        />
                        <div className=" pl-3 py-auto">
                          <p className="font-semibold leading-7 tracking-wide">
                            {order.user.firstname} {order.user.lastname}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold leading-7 tracking-wide text-center">
                        {order.payment_method}
                      </td>
                      <td className="px-6 py-4 font-semibold leading-7 tracking-wide text-center">
                        {format(
                          new Date(order.createdAt),
                          "MMMM d, yyyy h:mm aa"
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold leading-7 tracking-wide text-center">
                        {format(
                          new Date(order.updatedAt),
                          "MMMM d, yyyy h:mm aa"
                        )}
                      </td>
                    </tr>
                  );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderTable;
