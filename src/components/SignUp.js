import "./SignUp.css";
import { useState } from "react";
function SignUp() {
  const [name, SetName] = useState();
  const [password, Setpassword] = useState();
  const [confirmPassword, SetconfirmPassword] = useState();

  function cadastrar(e) {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  function errorMsg() {
    if (password != confirmPassword) return <span>Senhas não conferem</span>;
  }

  return (
    <div className="d-flex flex-column align-items-center content-box justify-content-center">
      <span className="title">Realize seu cadastro!</span>

      <form onSubmit={cadastrar}>
        <div className="d-flex flex-column input-box">
          <label>E-mail de acesso</label>
          <input
            placeholder="Digite seu e-email"
            onChange={(e) => {
              SetName(e.target.value);
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
          <div className="error-msg">{errorMsg()}</div>
        </div>
        <div className="d-flex flex-row justify-content-end button-row">
          <button className="button-box">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
