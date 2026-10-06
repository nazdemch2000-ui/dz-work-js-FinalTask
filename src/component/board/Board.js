import "./board.css";

export class Board {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="expense-board">
        <header class="board-header">
          <h1 class="board-title">Облік витрат</h1>

          <button class="add-expense-btn" id="openModalBtn">
            + Додати витрату
          </button>
        </header>

        <section class="total-expenses">
          <p class="total-title">Всього витрачено</p>
          <p class="total-amount">0 ₴</p>
        </section>

        <section class="expenses-section">
          <div class="expenses-header">
            <h2>Витрати</h2>

            <select class="category-filter" id="categoryFilter">
              <option value="all">Всі категорії</option>
              <option value="food">Продукти</option>
              <option value="transport">Транспорт</option>
              <option value="entertainment">Розваги</option>
              <option value="utilities">Комунальні</option>
              <option value="other">Інше</option>
            </select>
          </div>

          <div class="expenses-list" id="expensesList"></div>
        </section>
      </div>

      <div id="modalContainer"></div>
    `;
  }
}