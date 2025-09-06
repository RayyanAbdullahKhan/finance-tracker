// My finance tracker with filters + storage

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentFilter = "all"; // default filter = all

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateTotals(filtered) {
  let income = filtered.filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  let expense = filtered.filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  let balance = income - expense;

  document.getElementById("inc").textContent = income;
  document.getElementById("exp").textContent = expense;
  document.getElementById("bal").textContent = balance;
}

function renderList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const filtered = getFilteredTransactions();

  filtered.forEach((t) => {
    const li = document.createElement("li");

    li.innerHTML = `<strong>${t.date}</strong> | ${t.desc} : 
      <span style="color:${t.type === "income" ? "green" : "red"}">
        ${t.type === "income" ? "+" : "-"}${t.amount}
      </span>`;

    const del = document.createElement("button");
    del.textContent = "x";
    del.onclick = () => {
      transactions = transactions.filter(x => x !== t);
      saveData();
      renderList(); // re-render with filter still active
    };

    li.appendChild(del);
    list.appendChild(li);
  });

  updateTotals(filtered);
}

function add(isIncome) {
  const desc = document.getElementById("desc").value;
  const amt = parseFloat(document.getElementById("amt").value);
  let date = document.getElementById("date").value;

  if (!date) {
    const today = new Date();
    date = today.toISOString().split("T")[0];
  }

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
  renderList();

  document.getElementById("desc").value = "";
  document.getElementById("amt").value = "";
  document.getElementById("date").value = "";
}

function setFilter(type) {
  currentFilter = type;
  renderList(); // refresh list & totals immediately
}

function getFilteredTransactions() {
  if (currentFilter === "today") {
    const today = new Date().toISOString().split("T")[0];
    return transactions.filter(t => t.date === today);
  }

  if (currentFilter === "month") {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });
  }

  return transactions; // default = all
}

// initialize on load
renderList();
