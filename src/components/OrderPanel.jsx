import { useState, useEffect } from "react";
import apiCall from "./api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./partials/Header/Header";
import ScrollToTop from "./partials/ScrollToTop";
import SpinnerLoader from "./partials/loaders/SpinnerLoader";

function OrderPanel() {
  const [orders, setOrders] = useState(null);
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
      <Header />
      {orders ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
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
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    order && (
                      <tr
                        key={order.id}
                        className="bg-white border-b hover:bg-gray-200"
                      >
                        <th scope="row" className="px-6 py-4 text-center">
                          <div
                            key={order.id}
                            className="text-base font-semibold pl-3"
                          >
                            {order.status}
                          </div>
                        </th>
                        <td>
                          <div className="font-normal text-gray-500 text-center">
                            $ {order.total_price}
                          </div>
                        </td>
                        <td className="flex items-center px-6 py-4 text-gray-500 text-center">
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
                          <div className="text-base font-semibold pl-3 py-auto">
                            <p>
                              {order.user.firstname} {order.user.lastname}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.payment_method}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.createdAt}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.updatedAt}
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-60">
          <SpinnerLoader />
        </div>
      )}
      <ScrollToTop />
    </>
  );
}

export default OrderPanel;
