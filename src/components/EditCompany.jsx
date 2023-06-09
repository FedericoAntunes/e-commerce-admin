import { useEffect, useState } from "react";
import apiCall from "./api/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "./partials/loaders/SpinnerLoader";

function EditCompany() {
  const [company, setCompany] = useState({});
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [background, setBackground] = useState(company.background);
  const [logo, setLogo] = useState(company.logo);

  const params = useParams();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user);

  const getCompany = async () => {
    const response = await apiCall(`/companies/${params.slug}`, "get", null, {
      Authorization: `Bearer ${admin.token}`,
    });
    setCompany(response);
    setName(response.name);
    setDescription(response.description);
    setBackground(response.background);
    setLogo(response.logo);
  };

  useEffect(() => {
    getCompany();
    // eslint-disable-next-line
  }, []);

  async function handleEditCompany(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("background", background);
    formData.append("logo", logo);

    const response = await apiCall(
      `/companies/${company.id}`,
      "patch",
      formData,
      {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "multipart/form-data",
      }
    );
    if (response === "Company needs a name.") {
      return toast.warn("Company needs a name.", {
        position: "bottom-right",
      });
    }

    if (response === "Unavailable comapany name") {
      return toast.warn("Unavailable comapany name.", {
        position: "bottom-right",
      });
    }

    return navigate("/company-panel");
  }

  return (
    <>
      {company.name ? (
        <>
          <div className="w-fit h-fit mx-auto mt-10 flex items-center justify-center p-4">
            <div className=" relative w-auto mx-auto h-full max-w-2xl md:h-auto lg:w-[100rem]">
              <form
                onSubmit={handleEditCompany}
                className="relative bg-white rounded-lg shadow z-50"
              >
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit Company
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        name="company-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.name}`}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <textarea
                        id="company-description"
                        type="text"
                        name="company-description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 h-20 overflow-y-scroll"
                        placeholder={`${company.description}`}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        style={{ resize: "none" }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-image"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Logo
                      </label>
                      <input
                        id="company-image"
                        type="file"
                        name="company-image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.logo}`}
                        onChange={(event) => setLogo(event.target.files[0])}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-logo"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Background
                      </label>
                      <input
                        id="company-logo"
                        type="file"
                        name="company-logo"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder={`${company.background}`}
                        onChange={(event) =>
                          setBackground(event.target.files[0])
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <Link
                    to="/company-panel"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => (
                      // eslint-disable-next-line
                      setName(company.name),
                      setDescription(company.description),
                      setBackground(company.background),
                      setLogo(company.logo)
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

export default EditCompany;
