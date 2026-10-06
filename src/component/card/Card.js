import "./card.css";

export function createCardElement(expense) {
  return `
    <div class="expense-card" data-expense-id="${expense.id}">
      <div class="expense-card-header">
        <h4 class="expense-name">${escapeHTML(expense.name)}</h4>
        <span class="expense-amount">${expense.amount} ₴</span>
      </div>

      <div class="expense-card-info">
        <span class="expense-category">${escapeHTML(expense.category)}</span>
        <span class="expense-date">${expense.date}</span>
      </div>

      <div class="expense-card-actions">
        <button class="edit-btn">Редагувати</button>
        <button class="delete-btn">Видалити</button>
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}