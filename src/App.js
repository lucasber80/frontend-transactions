import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      className="d-flex align-items-start justify-content-center content"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img src={require("./assets/logo.png")} className="logo" />

        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="SignUp" element={<SignUp />} />
              <Route path="SignIn" element={<SignIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
