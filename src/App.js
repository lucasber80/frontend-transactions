import "./App.css";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div
      className="d-flex align-items-start justify-content-center content"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img src={require("./assets/logo.png")} className="logo" />

        <SignUp />
      </div>
    </div>
  );
}

export default App;
