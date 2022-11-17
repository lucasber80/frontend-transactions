import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [sucessMsg, SetSucessMsg] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");

  function cadastrar(e) {
    e.preventDefault();
  }

  return (
    <div className="d-flex flex-column align-items-center content-box justify-content-center">
      <div className="d-flex flex-row justify-content-start title">
        <span>Login</span>
      </div>

      <form onSubmit={cadastrar}>
        <div className="d-flex flex-column input-box ">
          <label>E-mail de acesso</label>
          <input
            placeholder="Digite seu e-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="d-flex flex-column input-box">
          <label>Senha</label>
          <input
            placeholder="Digite sua senha"
            type="password"
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
          ></input>
          <div className="error-msg">
            <span>{errorMsg}</span>
          </div>
          <div className="sucess-msg">
            <span>{sucessMsg}</span>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button className="button-box">Login</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
