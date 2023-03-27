import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPanel />} />
      </Routes>
    </div>
  );
}

export default App;
