import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { Dropdown, Avatar } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { logOutAdmin } from "../../../redux/slice/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const admin = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = () =>
    toast.warn("This feature is not included yet.", {
      position: "bottom-right",
    });

  function handleLogOut() {
    dispatch(logOutAdmin());
    return navigate("/login");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b fixed top-0 w-full z-40">
      <SideBar />
      <div className="max-w-screen-xl flex flex-wrap items-center my-auto">
        <div onClick={notify} className="m-auto py-4 w-fit">
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
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Company, user, admin or product."
            />
          </div>
        </div>{" "}
        <div className="flex items-center md:order-2">
          {admin ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img={
                    admin.avatar.substring(0, 4) === "http"
                      ? admin.avatar
                      : process.env.REACT_APP_SERVER_DOMAIN + admin.avatar
                  }
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{admin.username}</span>
                <span className="block truncate text-sm font-medium">
                  {admin.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleLogOut()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
