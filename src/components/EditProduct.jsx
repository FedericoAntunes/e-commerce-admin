import { useState, useEffect } from "react";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "./partials/loaders/SpinnerLoader";

function EditProduct() {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [in_offer, setIn_offer] = useState(null);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user);

  const getProductAndCategories = async () => {
    const productData = await apiCall(`/products/${params.id}`, "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setProduct(productData);
    setCategoryId(productData.categoryId);
    setDescription(productData.description);
    setIn_offer(productData.in_offer);
    setImage(productData.image);
    setLogo(productData.logo);
    setPrice(productData.price);
    setStock(productData.stock);
    setTitle(productData.title);

    const categoriesData = await apiCall(`/categories`, "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setCategories(categoriesData);
  };

  useEffect(() => {
    getProductAndCategories();
    // eslint-disable-next-line
  }, []);

  async function handleEditUser(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("in_offer", in_offer);
    formData.append("image", image);
    formData.append("logo", logo);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);

    const response = await apiCall(
      `/products/${product.id}`,
      "patch",
      formData,
      {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    if (response === "Fill all the fields.") {
      return toast.warn("Fill all needed fields (description is not needed).", {
        position: "bottom-right",
      });
    }
    if (response === "Product name already in use.") {
      return toast.warn("Product title already in use.", {
        position: "bottom-right",
      });
    }

    return navigate("/product-panel");
  }

  return (
    <>
      {product && product.category && product.title ? (
        <>
          <div className="w-fit h-fit mx-auto mt-10 flex items-center justify-center p-4 ">
            <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem] ">
              <form
                onSubmit={handleEditUser}
                className="relative bg-white rounded-lg shadow z-50"
              >
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit product
                  </h3>
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
                      <textarea
                        id="product-description"
                        type="text"
                        name="product-description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 h-20 overflow-y-scroll"
                        placeholder={`${product.description}`}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        style={{ resize: "none" }}
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
                        <option value={`${product.categoryId}`} selected>
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
                        In offer
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="select"
                        onChange={(event) => setIn_offer(event.target.value)}
                        defaultValue={`${product.in_offer}`}
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
                  <Link
                    to="/product-panel"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => (
                      // eslint-disable-next-line
                      setTitle(product.title),
                      setPrice(product.price),
                      setDescription(product.description),
                      setIn_offer(product.in_offer),
                      setStock(product.stock),
                      setImage(product.image),
                      setLogo(product.logo),
                      setCategoryId(product.category.id)
                    )}
                  >
                    Return
                  </Link>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save all
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-gray-200 fixed inset-0"></div>
        </>
      ) : (
        <div className="mt-60">
          <SpinnerLoader />
        </div>
      )}
    </>
  );
}

export default EditProduct;
