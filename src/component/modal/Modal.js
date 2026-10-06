import "./modal.css";

export class Modal {
  constructor(container, categories, expense = null, onSubmit, onClose) {
    this.container = container;
    this.categories = categories;
    this.expense = expense;
    this.onSubmit = onSubmit;
    this.onClose = onClose;

    this.render();
    this.initEventListeners();
  }

  render() {
    const isEdit = this.expense !== null;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modalBackdrop">
        <div class="modal-content">

          <div class="modal-header">
            <h3 class="modal-title">
              ${isEdit ? "Редагувати витрату" : "Додати витрату"}
            </h3>

            <button class="modal-close-btn" id="closeModalBtn">
              &times;
            </button>
          </div>

          <form id="expenseForm">

            <div class="form-group">
              <label class="form-label" for="expenseName">
                Назва
              </label>

              <input
                type="text"
                id="expenseName"
                class="form-input"
                placeholder="Наприклад: Продукти"
                value="${isEdit ? this.expense.name : ""}"
                required
                autocomplete="off"
              >
            </div>

            <div class="form-group">
              <label class="form-label" for="expenseAmount">
                Сума
              </label>

              <input
                type="number"
                id="expenseAmount"
                class="form-input"
                placeholder="Введіть суму"
                value="${isEdit ? this.expense.amount : ""}"
                min="0"
                step="0.01"
                required
              >
            </div>

            <div class="form-group">
              <label class="form-label" for="expenseCategory">
                Категорія
              </label>

              <select id="expenseCategory" class="form-select">
                ${this.categories
                  .map(
                    (category) => `
                      <option
                        value="${category.id}"
                        ${
                          isEdit &&
                          this.expense.category === category.id
                            ? "selected"
                            : ""
                        }
                      >
                        ${category.title}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="expenseDate">
                Дата
              </label>

              <input
                type="date"
                id="expenseDate"
                class="form-input"
                value="${isEdit ? this.expense.date : ""}"
                required
              >
            </div>

            <div class="modal-footer">

              <button
                type="button"
                class="btn btn-secondary"
                id="cancelBtn"
              >
                Скасувати
              </button>

              <button
                type="submit"
                class="btn btn-primary"
              >
                ${isEdit ? "Зберегти" : "Додати"}
              </button>

            </div>

          </form>
        </div>
      </div>
    `;
  }

  initEventListeners() {
    const backdrop = document.getElementById("modalBackdrop");
    const closeBtn = document.getElementById("closeModalBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const form = document.getElementById("expenseForm");

    const closeModal = () => {
      this.destroy();

      if (this.onClose) {
        this.onClose();
      }
    };

    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("expenseName").value.trim();
      const amount = Number(
        document.getElementById("expenseAmount").value
      );
      const category = document.getElementById("expenseCategory").value;
      const date = document.getElementById("expenseDate").value;

      if (!name || !amount || !date) {
        return;
      }

      const expense = {
        id: this.expense
          ? this.expense.id
          : "expense-" + crypto.randomUUID(),
        name,
        amount,
        category,
        date,
      };

      if (this.onSubmit) {
        this.onSubmit(expense);
      }

      closeModal();
    });
  }

  destroy() {
    this.container.innerHTML = "";
  }
}