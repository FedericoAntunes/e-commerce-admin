import SideBar from "./partials/SideBar";
import GrandielChart from "./partials/GrandielChart";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const admin = useSelector((state) => state.user);

  const getProducts = async () => {
    const responseProducts = await apiCall("/products", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setProducts(responseProducts);
    const responseUser = await apiCall("/users", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setUsers(responseUser);
  };
  const lowerStockProducts = products.filter((item) => item.stock < 10);
  const featuredProducts = products.filter((item) => item.featured);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SideBar />
      <div className="flex content-center justify-center flex-wrap">
        <GrandielChart />
        <div className="flex">
          <div className="m-10 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
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
                  <ul role="list" className="divide-y divide-gray-200">
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
                            alt="product-image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {product.title}
                          </p>
                        </div>{" "}
                        {product.stock === 0 ? (
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            Product out of stock!
                          </div>
                        ) : (
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {product.stock}
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
          <div className="m-10 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900">
                Featured products
              </h5>
              <Link
                to="/product-panel"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View product tables
              </Link>
            </div>
            <div className="flow-root">
              {featuredProducts.map((product) => {
                return (
                  <ul role="list" className="divide-y divide-gray-200">
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
                              alt="product-image"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {product.title}
                            </p>
                          </div>

                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                              Featured product!
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
    </>
  );
}
