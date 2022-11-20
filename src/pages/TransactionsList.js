import { useState } from "react";
import "../styles/TransactionList.css";
function TransactionList(props) {
  const [radio1, setradio1] = useState(false);
  const [dateFilter, setdateFilter] = useState("");

  const transactions = props.transactions;
  const user = props.user;

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }


  function formatDatePicker(date){
    let split = date.split("-")
    let newDate = split[2]+ "/" + split[1] + "/" + split[0]
    return newDate
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row align-items-end justify-content-around mb-3">
        <div className="d-flex flex-column input-home-box">
          <label>Data</label>
          <input
            placeholder="Valor"
            type="date"
            onChange={(e) => {
              let d = formatDatePicker(e.target.value);
              setdateFilter(d);
            }}
          ></input>
        </div>
        <div class="form-check radio-button">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={(e) => {
              setradio1(1);
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Cash In
          </label>
        </div>

        <div class="form-check radio-button">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onChange={(e) => {
              setradio1(2);
            }}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Cash Out
          </label>
        </div>
        <div class="form-check radio-button">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onChange={(e) => {
              setradio1(3);
            }}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Todos
          </label>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Debitado</th>
            <th scope="col">Creditado</th>
            <th scope="col">Data</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => {
            let debited_user = item["debited_user"];
            let credited_user = item["credited_user"];
            let date = formatDate(new Date(item["created_at"]));
            let datef = dateFilter;
            if (radio1 == 1) {
              if (credited_user.id == user.id && (date == datef || datef == ""))
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{debited_user.email}</td>
                    <td>{credited_user.email}</td>
                    <th>{date}</th>
                    <td>{item["value"]}</td>
                  </tr>
                );
            } else if (radio1 == 2) {
              if (debited_user.id == user.id && (date == datef || datef == ""))
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{debited_user.email}</td>
                    <td>{credited_user.email}</td>
                    <th>{date}</th>
                    <td>{item["value"]}</td>
                  </tr>
                );
            } else {
              if (date == datef || datef == "")
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{debited_user.email}</td>
                    <td>{credited_user.email}</td>
                    <th>{date}</th>
                    <td>{item["value"]}</td>
                  </tr>
                );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
