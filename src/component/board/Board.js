import "./board.css";
import { Modal } from "../modal/Modal";
import { Component } from "../core/Component.js";
import { createCardElement } from "../card/Card";
import { ACTIONS } from "../state/action.js";
import { Counter } from "../counter/countre.js";
import { Statistics } from "../ModalStatistic/Statistics.js";

export class Board extends Component {
  constructor(container, store) {
    super(container, store);
    this.currentFilter = "all";

    this.render();
    this.initEventListeners();
  }

  render() {
    const state = this.store.getState();

    this.container.innerHTML = `
      <div class="expense-board">
        <header class="board-header">
          <h1 class="board-title">Облік витрат</h1>
          <button class="add-expense-btn" id="openModalBtn">
            + Додати витрату
          </button>
        </header>

        <div id="counterContainer"></div>
        <div id="statisticsContainer"></div>
       

        <section class="expenses-section">
          <div class="expenses-header">
            <h2>Витрати</h2>

            <select class="category-filter" id="categoryFilter">
              <option value="all">Всі категорії</option>
              <option value="product">Продукти</option>
              <option value="transport">Транспорт</option>
              <option value="entertainment">Розваги</option>
              <option value="utilities">Комунальні</option>
              <option value="other">Інше</option>
            </select>
          </div>

          <div class="expenses-list" id="expensesList">
  ${this.getFilteredExpenses(state.expenses).map(createCardElement).join("")}
</div>
        </section>
      </div>

      <div id="modalContainer"></div>
    `;

    this.initCounter();
    this.initStatistics();
  }

  initStatistics() {
    const statisticsContainer = this.container.querySelector(
      "#statisticsContainer",
    );

    const state = this.store.getState();

    new Statistics(statisticsContainer, state.expenses);
  }
  initCounter() {
    const counterContainer = this.container.querySelector("#counterContainer");

    new Counter(counterContainer, this.store);
  }
  getFilteredExpenses(expenses) {
    const filter = this.currentFilter || "all";

    if (filter === "all") {
      return expenses;
    }

    return expenses.filter((expense) => expense.category === filter);
  }

  initEventListeners() {
    this.container.addEventListener("change", (event) => {
      if (event.target.id !== "categoryFilter") {
        return;
      }

      const category = event.target.value;
      const state = this.store.getState();

      const filteredExpenses =
        category === "all"
          ? state.expenses
          : state.expenses.filter((expense) => expense.category === category);

      const expensesList = document.getElementById("expensesList");

      expensesList.innerHTML = filteredExpenses.map(createCardElement).join("");
    });
    this.container.addEventListener("click", (event) => {
      if (event.target.id === "openModalBtn") {
        const modalContainer = document.getElementById("modalContainer");

        new Modal(modalContainer, this.store, this.store.getState().categories);
      }
    });

    this.container.addEventListener("click", (event) => {
      if (!event.target.classList.contains("edit-btn")) {
        return;
      }

      const card = event.target.closest(".expense-card");
      const expenseId = card.dataset.expenseId;

      const state = this.store.getState();

      const expense = state.expenses.find(
        (expense) => expense.id === expenseId,
      );

      const modalContainer = document.getElementById("modalContainer");

      new Modal(
        modalContainer,
        this.store,
        this.store.getState().categories,
        expense,
      );
    });

    this.container.addEventListener("click", (event) => {
      if (!event.target.classList.contains("delete-btn")) {
        return;
      }

      const card = event.target.closest(".expense-card");
      const expenseId = card.dataset.expenseId;

      if (confirm("Ви впевнені, що хочете видалити цю витрату?")) {
        this.store.dispatch({
          type: ACTIONS.DELETE_EXPENSE,
          payload: expenseId,
        });
      }
    });
  }
}
