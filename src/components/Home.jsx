import GrandielChart from "./partials/Home/GrandielChart";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderTable from "./partials/Home/OrderTable";
import Header from "./partials/Header/Header";

export default function Home() {
  const [products, setProducts] = useState([]);
  const admin = useSelector((state) => state.user);

  const getProducts = async () => {
    const responseProducts = await apiCall("/products", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setProducts(responseProducts);
  };
  const lowerStockProducts = products.filter((item) => item.stock < 10);
  const in_offerProducts = products.filter((item) => item.in_offer);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className="flex content-center justify-center flex-wrap mt-10">
        <div className="flex">
          <div>
            <GrandielChart />
            <div className="mx-auto my-10 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900">
                  Lower stock products
                </h5>
                <Link
                  to="/product-panel"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View product tables
                </Link>
              </div>
              <div className="flow-root">
                {lowerStockProducts.map((product) => {
                  return (
                    <ul key={product.id} className="divide-y divide-gray-200">
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={
                                product.image.substring(0, 4) === "http"
                                  ? product.image
                                  : process.env.REACT_APP_SERVER_DOMAIN +
                                    product.image
                              }
                              alt="product"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate ">
                              {product.title}
                            </p>
                          </div>{" "}
                          {product.stock === 0 ? (
                            <div className="inline-flex items-center text-base font-semibold">
                              <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                Product out of stock!
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center text-base font-semibold">
                              <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                {product.stock}
                              </span>
                            </div>
                          )}
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900">
                In offer products
              </h5>
              <Link
                to="/product-panel"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View product tables
              </Link>
            </div>
            <div className="flow-root">
              {in_offerProducts.map((product) => {
                return (
                  <ul key={product.id} className="divide-y divide-gray-200">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <>
                          <div className="flex-shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={
                                product.image.substring(0, 4) === "http"
                                  ? product.image
                                  : process.env.REACT_APP_SERVER_DOMAIN +
                                    product.image
                              }
                              alt="product"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {product.title}
                            </p>
                          </div>

                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                              In offer!
                            </span>
                          </div>
                        </>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <OrderTable />
    </>
  );
}
