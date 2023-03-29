import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import Home from "./components/Home";
import ProductPanel from "./components/ProductPanel";
import Login from "./components/Login";
import ProtectedPrivateRoute from "./components/auth/ProtectedPrivateRoute";
import ProtectedPublicRoute from "./components/auth/ProtectedPublicRoute";
import Error404 from "./components/Error404";
import CompanyPanel from "./components/CompanyPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedPrivateRoute redirectPath={"/login"} />}>
          <Route path="/" element={<Home />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/product-panel" element={<ProductPanel />} />
          <Route path="/company-panel" element={<CompanyPanel />} />
        </Route>
        <Route element={<ProtectedPublicRoute redirectPath={"/"} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
