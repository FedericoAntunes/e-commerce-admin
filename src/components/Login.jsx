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

  async function handleRunSeeders(event) {
    event.preventDefault();

    await apiCall(`/seeders`, "get");
    return "seeders!";
  }

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
    <section className="bg-gradient-to-r from-yellow-300 to-yellow-500">
      <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
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
        <div className="sm:w-full bg-gray-100 rounded-lg shadow md:mt-0 lg:w-1/4 py-6 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Sign in to your admin account
            </h1>
            <div className="flex justify-end text-sm font-medium">
              <Link
                to="https://no-hunger-food.vercel.app"
                className="text-green-500 hover:text-green-700 focus:text-green-700 hover:underline transform hover:scale-110 focus:scale-110 transition-all"
              >
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-green-500 mr-2"
                />
                No Hunger
              </Link>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Insert your email..."
                  value={inputEmail}
                  onChange={(event) => setInputEmail(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
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
                  className="text-sm font-medium text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex justify-center text-sm font-medium">
                <button
                  className="px-4 py-2 rounded-md text-white bg-blue-500 md:hover:bg-blue-600 focus:bg-blue-600 transition-colors"
                  type="button"
                  onClick={handleFillInputs}
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                  Fill Inputs
                </button>
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
                className="w-full text-gray-200	bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
