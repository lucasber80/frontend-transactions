import "../styles/Home.css";
import { useState } from "react";
import axiosInstance from "../api/api";
function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const account = user["account"];
  const [email, setEmail] = useState("");
  const [value, SetValue] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");
  function accountBox() {
    return (
      <div className="d-flex flex-column account-box p-3 justify-content-center col-5">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <i className="bi bi-person-circle"></i>
          <div className="d-flex flex-column">
            <span className="email">{user["email"]}</span>
            <span className="mt-2">Saldo em conta</span>
            <span className="balance ">
              {"R$ " + parseFloat(account["balance"]).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function postTransaction(e) {
    e.preventDefault();
    let creditedEmail = email;
    let debitedAccountId = user["id"];
    SetErrorMsg("");

    if (parseFloat(value) > parseFloat(account["balance"])) {
      SetErrorMsg(
        "Você não possui saldo suficiente para realizar esta transação"
      );
    } else {
      axiosInstance
        .post("transaction", {
          debitedAccountId: debitedAccountId,
          creditedAccountEmail: creditedEmail,
          value: value,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error)
          if (error.response.data.message == "invalid e-mail") {
            SetErrorMsg("E-mail inválido");
          } else {
            SetErrorMsg("Houve um erro ao realizar esta transação");
          }
        });
    }
  }

  return (
    <div className="d-flex flex-column box">
      <div className="d-flex flex-row justify-content-between">
        {accountBox()}
      </div>
      <div className=" d-flex flex-column content-box mt-3 p-3">
        <span className="transaction-title">Realize uma transferência</span>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-column input-box">
            <label>E-mail do usuário</label>
            <input
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="d-flex flex-column input-box">
            <label>Valor da transferência</label>
            <input
              placeholder="Valor"
              onChange={(e) => {
                SetValue(e.target.value);
              }}
            ></input>
          </div>
          <button className="transaction-button" onClick={postTransaction}>
            Transferir
          </button>
        </div>
        <div className="error-msg">
          <span>{errorMsg}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
