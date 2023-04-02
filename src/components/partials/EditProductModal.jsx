import { useState } from "react";
import apiCall from "../api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function EditProductModal({
  product,
  actualProductId,
  isEditModalOpen,
  setIsEditModalOpen,
  refresh,
  setRefresh,
  categories,
}) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [featured, setFeatured] = useState(product.featured);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.image);
  const [logo, setLogo] = useState(product.logo);
  const [categoryId, setCategoryId] = useState(product.category.id);

  const admin = useSelector((state) => state.user);

  async function handleEditUser(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("featured", featured);
    formData.append("image", image);
    formData.append("logo", logo);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);

    const response = await apiCall(
      `/products/${actualProductId}`,
      "patch",
      formData,
      {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    if (response === "Product name already in use.") {
      return toast.warn("Product name already in use.", {
        position: "bottom-right",
      });
    }
    if (response === "Product updated") {
      setRefresh(!refresh);
    }
    return setIsEditModalOpen(!isEditModalOpen);
  }

  return (
    <>
      {isEditModalOpen && actualProductId === product.id ? (
        <>
          <div className="h-fit w-fit m-auto mt-10 h-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
            <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
              <form
                onSubmit={handleEditUser}
                className="relative bg-white rounded-lg shadow "
              >
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit product
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={() => (
                      setIsEditModalOpen(),
                      setTitle(product.title),
                      setPrice(product.price),
                      setDescription(product.description),
                      setFeatured(product.featured),
                      setStock(product.stock),
                      setImage(product.image),
                      setLogo(product.logo),
                      setCategoryId(product.category.id)
                    )}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Title
                      </label>
                      <input
                        id="product-title"
                        type="text"
                        name="product-title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${product.title}`}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Price
                      </label>
                      <input
                        id="product-price"
                        type="number"
                        name="product-price"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${product.price}`}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <input
                        id="product-description"
                        type="text"
                        name="product-description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${product.description}`}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-stock"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Stock
                      </label>
                      <input
                        id="product-stock"
                        type="number"
                        name="product-stock"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${product.stock}`}
                        value={stock}
                        onChange={(event) => setStock(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-category"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Category
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="select"
                        onChange={(event) => setCategoryId(event.target.value)}
                      >
                        <option value={`${product.category.id}`} selected>
                          {product.category.name}
                        </option>
                        {categories.map((category) =>
                          category.name === product.category.name ? null : (
                            <option key={category.id} value={`${category.id}`}>
                              {category.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-feature"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Featured
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="select"
                        onChange={(event) => setFeatured(event.target.value)}
                        defaultValue={`${product.featured}`}
                      >
                        <option value="false">false</option>
                        <option value="true">true</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-image"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Image
                      </label>
                      <input
                        id="product-image"
                        type="file"
                        name="product-image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${product.image}`}
                        onChange={(event) => setImage(event.target.files[0])}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-logo"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Logo
                      </label>
                      <input
                        id="product-logo"
                        type="file"
                        name="product-logo"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${product.logo}`}
                        onChange={(event) => setLogo(event.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save all
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
          <div
            onClick={() => setIsEditModalOpen()}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
    </>
  );
}

export default EditProductModal;
