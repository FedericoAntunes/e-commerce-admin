import { useState, useEffect } from "react";
import apiCall from "./api/api";
import DeleteProductModal from "./partials/DeleteProductModal";
import { useSelector } from "react-redux";
import Header from "./partials/Header/Header";
import { Link } from "react-router-dom";

export default function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actualProductId, setActualProductId] = useState({});
  const admin = useSelector((state) => state.user);

  function handleOpenDeleteModal(productId) {
    setActualProductId(productId);
    return setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  const getProducts = async () => {
    const response = await apiCall("/products", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setProducts(response);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      {products && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-end m-10">
            <Link
              to="/create-product"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Add Product
            </Link>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="pl-20 pr-6 py-3 w-1/5">
                  Name
                </th>
                <th scope="col" className="pl-6 pr-6 py-3 text-center">
                  Logo
                </th>
                <th scope="col" className="pl-6 pr-6 py-3 text-center">
                  Category
                </th>
                <th scope="col" className="pl-20 pr-6 py-3 w-1/3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  In offer
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="text-center px-6 py-3">
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
                        className="flex items-center px-6 py-4 text-gray-900"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            product.image.substring(0, 4) === "http"
                              ? product.image
                              : process.env.REACT_APP_SERVER_DOMAIN +
                                product.image
                          }
                          alt="product"
                        />

                        <div className="text-base font-semibold mx-4">
                          {product.title}
                        </div>
                      </th>
                      <td className="px-6 py-4 mx-auto">
                        <img
                          className="w-16 h-16"
                          src={
                            product.logo.substring(0, 4) === "http"
                              ? product.logo
                              : process.env.REACT_APP_SERVER_DOMAIN +
                                product.logo
                          }
                          alt="product"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.category.name}
                      </td>
                      <td className="px-6 py-4 ">
                        <div className="font-normal text-gray-500">
                          <p>{product.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-normal text-gray-500">
                          {product.company.name}
                        </div>
                      </td>
                      {product.in_offer ? (
                        <td className="px-6 py-4 text-center">Yes</td>
                      ) : (
                        <td className="px-6 py-4 text-center">No</td>
                      )}
                      <td className="px-6 py-4 text-center">{product.stock}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">
                        <div>
                          <Link
                            to={`/edit-product/${product.id}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Edit product
                          </Link>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => handleOpenDeleteModal(product.id)}
                            type="button"
                            className="font-medium text-red-600 hover:underline"
                          >
                            Delete product
                          </button>
                          <DeleteProductModal
                            product={product}
                            actualProductId={actualProductId}
                            isDeleteModalOpen={isDeleteModalOpen}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                            products={products}
                            setProducts={setProducts}
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
      )}
    </>
  );
}
