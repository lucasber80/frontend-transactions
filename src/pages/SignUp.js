import "../styles/SignUp.css";
import { useState } from "react";
import axiosInstance from "../api/api";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [emailMsg, SetEmailMsg] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");
  const [sucessMsg, SetSucessMsg] = useState("");
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function cadastrar(e) {
    e.preventDefault();

    if (
      mailformat.test(email) &&
      password == confirmPassword &&
      password.length >= 8
    ) {
      SetEmailMsg("");
      SetSucessMsg("");
      SetErrorMsg("");
      axiosInstance
        .post("users", {
          email: email,
          password: password,
        })
        .then(function (response) {
          SetSucessMsg("Conta criada com sucesso!");
        })
        .catch(function (error) {
          if (error.response.data == "email already in use") {
            SetEmailMsg("o e-mail já esta em uso");
          } else {
            SetErrorMsg("Houve um erro ao tentar realizar o cadastro");
          }
        });
    } else {
      if (!mailformat.test(email)) SetEmailMsg("E-mail inválido");
    }
  }

  function errorPasswordMsg() {
    if (password != confirmPassword) {
      return <span>As senhas não coincidem</span>;
    }
  }
  function errorPasswordMin() {
    if (password.length < 8 && password.length > 0) {
      return <span>A senha precisa ter pelo menos 8 caracteres</span>;
    }
  }

  return (
    <div className="d-flex flex-column align-items-center content-box justify-content-center">
      <div className="d-flex flex-row justify-content-start title">
        <span>Realize seu cadastro!</span>
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
          <div className="error-msg">
            <span>{emailMsg}</span>
          </div>
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
          <div className="d-flex flex-column error-msg">
            {errorPasswordMin()}
          </div>
        </div>
        <div className="d-flex flex-column input-box">
          <label>Confirme sua senha</label>
          <input
            placeholder="Confirme sua senha"
            type="password"
            onChange={(e) => {
              SetconfirmPassword(e.target.value);
            }}
          ></input>
          <div className="error-msg">{errorPasswordMsg()}</div>
          <div className="error-msg">
            <span>{errorMsg}</span>
          </div>
          <div className="sucess-msg">
            <span>{sucessMsg}</span>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-between align-items-end">
          <a className="icon-button" href="/signIn">
            <i className="bi bi-arrow-left"></i>
          </a>
          <button className="button-box">Cadastre-se</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
