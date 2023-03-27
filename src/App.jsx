import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import Home from "./components/Home";
import ProductPanel from "./components/ProductPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/product-panel" element={<ProductPanel />} />
      </Routes>
    </div>
  );
}

export default App;
