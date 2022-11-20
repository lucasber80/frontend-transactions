import "../styles/SignUp.css";
import { useState } from "react";
import axiosInstance from "../api/api";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");
  const nav = useNavigate();
  


  function login(e) {
    e.preventDefault();
 
    SetErrorMsg("");
    axiosInstance
      .post("session", {
        email: email,
        password: password,
      })
      .then( function (response) {
        let user = response.data.user;
        let token = response.data.token.token;
         localStorage.setItem("token", token);
         localStorage.setItem("user", JSON.stringify(user));
        nav("/home");
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          SetErrorMsg("E-mail ou senha incorretos");
        } else {
          SetErrorMsg("Houve um erro ao realizar o login");
        }
        console.log(error);
      });
  }

  return (
    <div className="d-flex flex-column align-items-center content-box justify-content-center">
      <div className="d-flex flex-row justify-content-start title">
        <span>Login</span>
      </div>

      <form onSubmit={login}>
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
        </div>
        <div className="href-button">
          <a href="/signUp">Não possui conta ainda? Cadastre-se</a>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button className="button-box">Login</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
