function TransactionList(props) {
  const transactions = props.transactions;
  
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
  return (
    <div>
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
            return (
              <tr>
                <td>{index}</td>
                <td>{debited_user.email}</td>
                <td>{credited_user.email}</td>
                <th>{formatDate(new Date(item["created_at"]))}</th>
                <td>{item["value"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
