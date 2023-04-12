import { useState, useEffect } from "react";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [in_offer, setIn_offer] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();

  const admin = useSelector((state) => state.user);

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCompany = async () => {
    const response = await apiCall("/companies", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setCompanies(response);
  };
  const getCategories = async () => {
    const response = await apiCall("/categories", "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setCategories(response);
  };

  useEffect(() => {
    getCompany();
    getCategories();
    // eslint-disable-next-line
  }, []);

  async function handleCreateProduct(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("in_offer", in_offer);
    formData.append("image", image);
    formData.append("logo", logo);
    formData.append("stock", stock);
    formData.append("companyId", companyId);
    formData.append("categoryId", categoryId);
    formData.append("slug", "");

    const response = await apiCall(`/products`, "post", formData, {
      Authorization: `Bearer ${admin.token}`,
      "Content-Type": "multipart/form-data",
    });

    if (response === "Product already exist.") {
      return toast.warn("This product name already exist.", {
        position: "bottom-right",
      });
    }
    if (response === "Fill all the fields.") {
      return toast.warn(
        "Please, fill all the fields and select the all options.",
        {
          position: "bottom-right",
        }
      );
    }
    if (response === "Product stored.") {
      setTitle("");
      setCategoryId("");
      setDescription("");
      setIn_offer("");
      setImage("");
      setLogo("");
      setPrice("");
      setStock("");
      setCompanyId("");
    }
    return navigate("/product-panel");
  }

  return (
    <>
      <div className="h-fit w-fit m-auto fixed top-0 left-0 right-0 z-50 items-center justify-center p-4 overflow-y-auto md:inset-0">
        <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]   ">
          <form
            onSubmit={handleCreateProduct}
            className="relative bg-white rounded-lg shadow "
          >
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Create product
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
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Company
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="select"
                    onChange={(event) => setCompanyId(event.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      Choose restaurant
                    </option>

                    {companies.map((company) => (
                      <option key={company.id} value={`${company.id}`}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="select"
                    onChange={(event) => setCategoryId(event.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      Choose category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={`${category.id}`}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Stock
                  </label>
                  <input
                    id="product-stock"
                    type="number"
                    name="product-stock"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                  />
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
                  >
                    <option value="" selected disabled hidden>
                      Choose if the product is in_offer
                    </option>
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
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
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
                  setTitle(""),
                  setPrice(""),
                  setDescription(""),
                  setIn_offer(""),
                  setStock(""),
                  setImage(""),
                  setLogo(""),
                  setCompanyId(""),
                  setCategoryId("")
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
      <div className="fixed inset-0 z-40 bg-gray-200"></div>
    </>
  );
}

export default CreateProduct;
