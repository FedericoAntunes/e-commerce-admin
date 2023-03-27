import { useState, useEffect } from "react";
import SideBar from "./partials/SideBar";
import apiCall from "./api/api";
import { ToastContainer, toast } from "react-toastify";

export default function ProductPanel() {
  const [products, setProducts] = useState([]);

  const notify = () =>
    toast.warn("This feature is not included yet.", {
      position: "bottom-right",
    });

  const getProducts = async () => {
    const response = await apiCall("/products", "get");
    setProducts(response);
    console.log(response);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <SideBar />
      {products && (
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
                id="table-search-products"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search product"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="pl-20 pr-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  product && (
                    <tr
                      key={product.id}
                      className="bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`${product.image}`}
                          alt="product-image"
                        />
                        <div key={product.id} className="pl-3">
                          <div className="text-base font-semibold">
                            {product.title}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="font-normal text-gray-500">
                          {product.company.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">
                        {" "}
                        <div>
                          <button
                            type="button"
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Edit product
                          </button>
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:underline"
                          >
                            Delete product
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}