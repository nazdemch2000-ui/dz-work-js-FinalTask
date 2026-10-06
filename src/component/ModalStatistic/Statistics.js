import "./statistics.css";

export class Statistics {
  constructor(container, expenses) {
    this.container = container;
    this.expenses = expenses;

    this.render();
  }

  render() {
    const total = this.expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    const count = this.expenses.length;

    const average = count > 0 ? total / count : 0;

    const mostExpensive = this.expenses.find(
      (expense) =>
        expense.amount ===
        Math.max(...this.expenses.map((expense) => Number(expense.amount))),
    );

    const categories = this.expenses.reduce((result, expense) => {
      result[expense.category] =
        (result[expense.category] || 0) + Number(expense.amount);

      return result;
    }, {});

    const categoryExpenses = Object.entries(categories);

    const mostExpensiveCategory =
      categoryExpenses.length > 0
        ? categoryExpenses.reduce((max, category) =>
            category[1] > max[1] ? category : max,
          )
        : null;

    this.container.innerHTML = `
      <section class="statistics">
        <h2>Статистика</h2>

        <div class="statistics-list">
          <div class="statistic-item">
            <span>Загальна сума</span>
            <strong>${total.toFixed(2)} ₴</strong>
          </div>

          <div class="statistic-item">
            <span>Кількість витрат</span>
            <strong>${count}</strong>
          </div>

          <div class="statistic-item">
            <span>Середня витрата</span>
            <strong>${average.toFixed(2)} ₴</strong>
          </div>

          <div class="statistic-item">
            <span>Найдорожча витрата</span>
            <strong>
              ${mostExpensive ? `${mostExpensive.name} — ${mostExpensive.amount} ₴` : "—"}
            </strong>
          </div>

          <div class="statistic-item">
            <span>Найбільше витрачено на</span>
            <strong>
              ${mostExpensiveCategory ? mostExpensiveCategory[0] : "—"}
            </strong>
          </div>
        </div>
      </section>
    `;
  }
}
