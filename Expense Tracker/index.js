let form = document.querySelector("#form");

form.addEventListener("submit", function (event) {
  let previousExpense =
    JSON.parse(localStorage.getItem("overAll-Expense")) || [];
  event.preventDefault();
  let amountSpend = document.getElementById("amount").value;
  let descriptionAdded = document.getElementById("text").value; // Corrected ID to "text"
  let categorySelected = document.getElementById("category").value;

  let Expense = {
    Amount: amountSpend,
    Description: descriptionAdded,
    Category: categorySelected,
  };

  previousExpense.push(Expense);
  localStorage.setItem("overAll-Expense", JSON.stringify(previousExpense));

  displayExpense();
  form.reset();
});

function displayExpense() {
  let previousExpense =
    JSON.parse(localStorage.getItem("overAll-Expense")) || [];
  let expenseList = document.getElementById("expenseList");
   expenseList.innerHTML = "";

  previousExpense.forEach((element, index) => {
   
    let expenseMade = document.createElement("li");
    expenseMade.className = "exp-made ";
    expenseMade.classList.add("list-group-item");
  
    expenseMade.textContent = `Amount: ${element.Amount}, Description: ${element.Description}, Category: ${element.Category}`;

    // Adding Edit-Expense-button
    let editButton = document.createElement("button");
    let editButtonText = document.createTextNode("Edit Expense");
    editButton.appendChild(editButtonText);
    editButton.className = "edit-btn btn btn-outline-warning btn-sm";  
    editButton.style.margin = "10px"

    expenseMade.appendChild(editButton);

    editButton.addEventListener("click", function (event) {
      editExpense(event, index);
    });

    // Adding Delete-Expense-button
    let deleteButton = document.createElement("button");
    let deleteButtonText = document.createTextNode("Delete Expense");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.className = "del-btn btn btn-dark btn-sm";

    expenseMade.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (event) {
      deleteExpense(event, index);
    });

    expenseList.appendChild(expenseMade);
  });
}

// Defining edit-expense function
function editExpense(event, index) {
  let previousExpense = JSON.parse(localStorage.getItem("overAll-Expense"));
  let currentExpense = previousExpense[index];
  previousExpense.splice(index, 1);

  if (
    event.target.classList.contains("del-btn") ||
    event.target.classList.contains("btn-dark") ||
    event.target.classList.contains("btn-sm")
  ) {
    let expenseToDelete = event.target.parentElement;
    expenseList.removeChild(expenseToDelete);
  }

  document.getElementById("amount").value = currentExpense.Amount;
  document.getElementById("text").value = currentExpense.Description;
  document.getElementById("category").value = currentExpense.Category;

  localStorage.setItem("overAll-Expense", JSON.stringify(previousExpense));
}

// Deleting Expenses made on clicking delete button
let expenseList = document.getElementById("expenseList");

function deleteExpense(event, index) {
  let previousExpense = JSON.parse(localStorage.getItem("overAll-Expense"));
  previousExpense.splice(index, 1);


  if (
    event.target.classList.contains("del-btn") ||
    event.target.classList.contains("btn-dark") ||
    event.target.classList.contains("btn-sm")
  ) {
    let expenseToDelete = event.target.parentElement;
    expenseList.removeChild(expenseToDelete);
  }
    localStorage.setItem("overAll-Expense", JSON.stringify(previousExpense));
}

// Initial Display of Expenses
displayExpense();
