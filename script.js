const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const recommendations = document.getElementById('recommendations');

let expenses = [];

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const item = document.getElementById('item').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    const expense = {
        date,
        category,
        item,
        amount,
        description
    };

    expenses.push(expense);
    renderExpenses();
    renderRecommendations();
});

function renderExpenses() {
    expenseList.innerHTML = ''; // Clear previous list

    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <strong>${expense.item}</strong> - $${expense.amount}<br>
            Date: ${expense.date} | Category: ${expense.category}<br>
            Description: ${expense.description}<br>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

function renderRecommendations() {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    recommendations.innerHTML = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    // Simple recommendations based on the total expenses
    if (totalExpenses > 1000) {
        recommendations.innerHTML += '<p>Consider cutting down on your expenses to save more!</p>';
    } else if (totalExpenses > 500) {
        recommendations.innerHTML += '<p>You are doing well, but there is still room for savings.</p>';
    } else {
        recommendations.innerHTML += '<p>Great job! Keep up the good work managing your expenses.</p>';
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1); // Remove the expense from the array
    renderExpenses(); // Re-render the updated list
    renderRecommendations(); // Re-render the updated recommendations
}
