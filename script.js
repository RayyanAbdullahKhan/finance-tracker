let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateTotals() {
  let income = transactions.filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  let expense = transactions.filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  let balance = income - expense;

  document.getElementById("inc").textContent = income;
  document.getElementById("exp").textContent = expense;
  document.getElementById("bal").textContent = balance;
}

function renderList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${t.date} | ${t.desc} : ${t.type === "income" ? "+" : "-"}${t.amount}`;
    li.style.color = t.type === "income" ? "green" : "red";

    // delete button
    const del = document.createElement("button");
    del.textContent = "x";
    del.onclick = () => {
      transactions.splice(i, 1);
      saveData();
      updateTotals();
      renderList();
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}

function add(isIncome) {
  const desc = document.getElementById("desc").value;
  const amt = parseFloat(document.getElementById("amt").value);
  const date = document.getElementById("date").value || new Date().toISOString().split("T")[0];

  if (!desc || isNaN(amt)) {
    alert("Please enter description and amount.");
    return;
  }

  transactions.push({
    desc: desc,
    amount: amt,
    date: date,
    type: isIncome ? "income" : "expense"
  });

  saveData();
  updateTotals();
  renderList();

  document.getElementById("desc").value = "";
  document.getElementById("amt").value = "";
  document.getElementById("date").value = "";
}

updateTotals();
renderList();
