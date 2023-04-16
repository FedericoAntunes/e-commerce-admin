import { Link, useNavigate } from "react-router-dom";
import apiCall from "./api/api";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../redux/slice/adminSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleFillInputs = () => {
    setInputEmail("admin@hotmail.com");
    setInputPassword("123");
  };

  /*async function handleRunSeeders(event) {
    event.preventDefault();

    await apiCall(`/seeders`, "get");
    return "seeders!";
  }*/

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await apiCall("/login/admin", "post", {
      email: inputEmail,
      password: inputPassword,
    });
    dispatch(
      loginAdmin({
        id: response.id,
        firstname: response.firstname,
        lastname: response.lastname,
        username: response.username,
        token: response.token,
        email: response.email,
        avatar: response.avatar,
      })
    );
    navigate("/");
  };
  return (
    <section className="bg-[url('https://images-ext-2.discordapp.net/external/B-Q5yWCKhF1nxZrMrnfRo3NIfNEwWDplURKiwmDcx2E/%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D1260%26h%3D750%26dpr%3D1/https/images.pexels.com/photos/616401/pexels-photo-616401.jpeg')] bg-cover bg-no-repeat w-full min-h-screen">
      <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Link
          to="/about-us"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className=" h-24 -mb-[4.5rem] z-10"
            src="https://i.ibb.co/pQFPDr4/no-hunger-update.png"
            alt="logo"
          />
        </Link>
        <div className="w-full sm:w-[600px] bg-transparent backdrop-blur border border-gray backdrop-grayscale-[0.5]  shadow-xl rounded-lg md:mt-0 py-6">
          <div className="p-6 pb-0 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Sign in to your admin account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-black tracking-wide"
                >
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                  placeholder="Insert your email..."
                  value={inputEmail}
                  onChange={(event) => setInputEmail(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-black tracking-wide"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                  value={inputPassword}
                  onChange={(event) => setInputPassword(event.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4  border-gray-300 rounded cursor-pointer text-green-500 bg-gray-50 focus:ring-0 focus:ring-offset-0 active:ring-0"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-black font-medium"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="#"
                  className="text-base font-medium text-green-600 lg:hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/*<div className="flex justify-center text-sm font-medium">
                <button
                  className="px-4 py-2 rounded-md text-white bg-blue-500 md:hover:bg-blue-600 focus:bg-blue-600 transition-colors"
                  type="button"
                  onClick={handleRunSeeders}
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                  Run Seeders
                </button>
  </div>*/}
              <button
                type="submit"
                className="w-full text-gray-200	bg-yellow-500 lg:hover:bg-yellow-400 ease-in-out duration-300 active:bg-yellow-600 font-medium rounded-lg text-base px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white text-left border shadow-lg rounded-lg mt-10 w-full sm:w-[600px] px-5 py-8 lg:absolute lg:right-0 lg:w-[200px] lg:rounded-r-none mr-0">
          <h3 className="mb-2 font-semibold">Fill fields with test data</h3>
          <p className="text-sm">
            To simplify the access to the application, we provide the
            information of an existing account to fill the fields:
          </p>
          <div className="flex justify-center text-sm font-medium border-b pb-2">
            <button
              className="m-2 p-2 md:px-4 md:py-2  rounded-md text-white bg-green-500 lg:hover:bg-green-600 active:bg-green-600 transition-colors"
              type="button"
              onClick={handleFillInputs}
            >
              <div className="flex mx-auto items-center">
                <FontAwesomeIcon icon={faPencilAlt} className="mr-2 " />
                <p className="lg:text-left lg:w-[65px]">
                  Insert test admin data
                </p>
              </div>
            </button>
          </div>
          <h3 className="mb-2 font-semibold mt-6">Go to No-Hunger</h3>
          <p className="text-sm">Go to the login of No-Hunger and enjoy!</p>
          <div className="flex justify-center mt-2 text-sm font-medium">
            <Link
              to="https://no-hunger-food.vercel.app/login"
              className="text-green-500 hover:text-green-700 focus:text-green-700 hover:underline transform hover:scale-110 focus:scale-110 transition-all"
            >
              <FontAwesomeIcon
                icon={faUtensils}
                className="text-green-500 mr-2"
              />
              No Hunger
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
