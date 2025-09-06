// store all transactionas
let trans = JSON.parse(localStorage.getItem("trans")) || [];

function add(isIncome) {
  let desc = document.getElementById("desc").value;
  let amt = parseFloat(document.getElementById("amt").value);

  if (desc === "" || isNaN(amt)) {
    alert("Please enter details");
    return;
  }

  if (!isIncome) amt = -amt;

  let t = {
    id: Date.now(),
    desc: desc,
    amt: amt
  };

  trans.push(t);
  save();
  update();

  // clear inputs
  document.getElementById("desc").value = "";
  document.getElementById("amt").value = "";
}

function remove(id) {
  trans = trans.filter(x => x.id !== id);
  save();
  update();
}

function update() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let inc = 0, exp = 0;

  trans.forEach(x => {
    let li = document.createElement("li");
    li.className = x.amt > 0 ? "in" : "out";
    li.innerHTML = `
      ${x.desc}: ${x.amt.toFixed(2)}
      <button class="del" onclick="remove(${x.id})">✖</button>
    `;
    list.appendChild(li);

    if (x.amt > 0) inc += x.amt;
    else exp += x.amt;
  });

  document.getElementById("inc").textContent = inc.toFixed(2);
  document.getElementById("exp").textContent = exp.toFixed(2);
  document.getElementById("bal").textContent = (inc + exp).toFixed(2);
}
// i added this after learning localStorage (probably forgot this due the crazy amount of studying i do, yes im glazing my slef)

function save() {
  localStorage.setItem("trans", JSON.stringify(trans));
}

update();
// i hate ts i hate java
let date = new Date().toLocaleString();
li.textContent = `${type.toUpperCase()}: ${amount} (${date})`;
