import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
function SignUp() {
  const [email, setEmail] = useState("");
  const [passwordMin, SetPasswordMin] = useState("");
  const [password, Setpassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [emailMsg, SetEmailMsg] = useState("");
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function cadastrar(e) {
    e.preventDefault();

    if (
      mailformat.test(email) &&
      password == confirmPassword &&
      password.length >= 8
    ) {
      SetEmailMsg("");
      SetPasswordMin("");
      axios
        .post("http://localhost:3333/users", {
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          if (error.response.data == "email already in use")
            SetEmailMsg("o e-mail já esta em uso");
        });
    } else {
      if (!mailformat.test(email)) SetEmailMsg("E-mail inválido");
      if (password.length < 8)
        SetPasswordMin("A senha precisa ter pelo menos 8 caracteres");
    }
  }

  function errorPasswordMsg() {
    if (password != confirmPassword) {
      return <span>As senhas não coincidem</span>;
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
            <span>{passwordMin}</span>
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
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button className="button-box">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
