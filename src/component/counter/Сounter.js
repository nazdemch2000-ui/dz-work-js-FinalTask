import "./counter.css";

export class Counter {
  constructor(container, store) {
    this.container = container;
    this.store = store;

    this.render();
  }

  render() {
    const state = this.store.getState();

    const total = state.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    this.container.innerHTML = `
      <section class="total-expenses">
        <p class="total-title">Всього витрачено</p>
        <p class="total-amount">${total} ₴</p>
      </section>
    `;
  }
}
