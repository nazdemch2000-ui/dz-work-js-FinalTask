export const initialState = {
  categories: [
    { id: "product", title: "Product" },
    { id: "transport", title: "Transport" },
    { id: "food", title: "Food" },
    { id: "entertainment", title: "Entertainment" },
    { id: "other", title: "Other" },
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