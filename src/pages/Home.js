import "../styles/Home.css";
import { useState } from "react";
function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const account = user["account"];
 const [email, setEmail] = useState("");
 const [value, SetValue] = useState("");
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

  return (
    <div className="d-flex flex-column box">
      <div className="d-flex flex-row justify-content-between">
        {accountBox()}
      </div>
      <div className=" d-flex flex-column content-box mt-3 p-3">
        <span className="transaction-title">Realize uma transferência</span>
        <div className="d-flex flex-row justify-content-around align-items-center">
          <div className="d-flex flex-column input-box">
            <label>E-mail do usuário</label>
            <input placeholder="E-mail" onChange={(e) => {setEmail(e.target.value);}}></input>
          </div>

          <div className="d-flex flex-column input-box">
            <label>Valor da transferência</label>
            <input placeholder="Valor" onChange={(e) => {SetValue(e.target.value);}}></input>
          </div>
          <button className="transaction-button">Transferir</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
