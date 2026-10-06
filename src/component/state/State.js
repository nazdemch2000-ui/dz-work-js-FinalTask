export const initialState = {
  categories: [
    { id: "product", title: "Продукти" },
    { id: "transport", title: "Транспорт" },
    { id: "entertainment", title: "Розваги" },
    { id: "utilities", title: "Комунальні" },
    { id: "other", title: "Інше" },
  ],

  expenses: [
    {
      id: "expense-1",
      name: "Продукты",
      amount: 500,
      category: "product",
      date: "2026-09-20",
    },
    {
      id: "expense-2",
      name: "Такси",
      amount: 250,
      category: "transport",
      date: "2026-09-20",
    },
  ],

  searchQuery: "",
};
