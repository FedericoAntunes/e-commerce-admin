import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UserPanel from "./components/UserPanel";
import Home from "./components/Home";
import ProductPanel from "./components/ProductPanel";
import Login from "./components/Login";
import ProtectedPrivateRoute from "./components/auth/ProtectedPrivateRoute";
import ProtectedPublicRoute from "./components/auth/ProtectedPublicRoute";
import Error404 from "./components/Error404";
import CompanyPanel from "./components/CompanyPanel";
import AdminPanel from "./components/AdminPanel";
import CreateAdmin from "./components/CreateAdmin";
import CreateCompany from "./components/CreateCompany";
import CreateProduct from "./components/CreateProduct";
import EditCompany from "./components/EditCompany";
import EditProduct from "./components/EditProduct";
import EditUser from "./components/EditUser";
import OrderPanel from "./components/OrderPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedPrivateRoute redirectPath={"/login"} />}>
          <Route path="/" element={<Home />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/product-panel" element={<ProductPanel />} />
          <Route path="/company-panel" element={<CompanyPanel />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/order-panel" element={<OrderPanel />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/create-company" element={<CreateCompany />} />
          <Route path="/edit-company/:slug" element={<EditCompany />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Route>
        <Route element={<ProtectedPublicRoute redirectPath={"/"} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
