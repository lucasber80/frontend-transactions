import "../styles/Home.css";
import { useState } from "react";
import axiosInstance from "../api/api";
import TransactionList from "./TransactionsList";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [account, setAaccount] = useState(user["account"]);
  const [value, SetValue] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");
  const [transactions, SetTransactions] = useState();
  const nav = useNavigate();

  function accountBox() {
    return (
      <div className="d-flex flex-column account-box p-3 justify-content-center col-4">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <i className="bi bi-person-circle"></i>
          <div className="d-flex flex-column">
            <span className="email">{user["email"]}</span>
            <span className="mt-2">Saldo em conta</span>
            <span className="balance">
              {"R$ " + parseFloat(account["balance"]).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function transactionList() {
    if (!transactions) getTransactionsById();
    if (transactions)
      return (
        <div>
          <TransactionList
            transactions={transactions}
            user={user}
          ></TransactionList>
        </div>
      );
  }

  function postTransaction(e) {
    e.preventDefault();
    let creditedEmail = email;
    let debitedAccountId = user["id"];
    SetErrorMsg("");

    axiosInstance
      .post("transaction", {
        debitedAccountId: debitedAccountId,
        creditedAccountEmail: creditedEmail,
        value: value,
      })
      .then(function (response) {
        getUser();
        getTransactionsById();
      })
      .catch(function (error) {
        if (error.response.data == "invalid e-mail") {
          SetErrorMsg("E-mail inválido");
        } else if (error.response.data == "no balance") {
          SetErrorMsg(
            "Você não possui saldo suficiente para realizar esta transação"
          );
        } else if (error.response.data == "same e-mail") {
          SetErrorMsg("E-mail inválido");
        } else {
          SetErrorMsg("Houve um erro ao realizar esta transação");
        }
      });
  }

  function logout(e) {
    e.preventDefault();

    axiosInstance
      .delete("sessions", {})
      .then(function (response) {
        console.log(response);
        nav("/signIn");
      })
      .catch(function (error) {});
  }

  function getUser() {
    const id = JSON.parse(localStorage.getItem("user"))["id"];
    axiosInstance
      .get("users/" + id)
      .then(function (response) {
        setUser(response.data.user);
        setAaccount(response.data.user["account"]);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getTransactionsById() {
    const id = JSON.parse(localStorage.getItem("user"))["id"];
    axiosInstance
      .get("transaction/" + id)
      .then(function (response) {
        console.log(response);
        SetTransactions(response.data.transactions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="d-flex flex-column box">
      <div className="d-flex flex-row justify-content-between">
        {accountBox()}
      </div>
      <div className=" d-flex flex-column content-home-box mt-3 p-3">
        <div className="d-flex flex-row justify-content-between">
          <span className="transaction-title">Realize uma transferência</span>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-end">
          <div className="d-flex flex-column input-home-box">
            <label>E-mail do usuário</label>
            <input
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="d-flex flex-column input-home-box">
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
        <div className="d-flex flex-row border border-secondary mt-3 mb-3"></div>
        {transactionList()}
      </div>
    </div>
  );
}

export default Home;
