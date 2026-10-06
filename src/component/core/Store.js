import { ACTIONS } from "../state/action";

export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  dispatch(action) {
    const state = this.getState();

    switch (action.type) {
      case ACTIONS.ADD_EXPENSE:
        this.setState({
          expenses: [...state.expenses, action.payload],
        });
        break;

      case ACTIONS.EDIT_EXPENSE:
        this.setState({
          expenses: state.expenses.map((expense) =>
            expense.id === action.payload.id ? action.payload : expense,
          ),
        });
        break;

      case ACTIONS.DELETE_EXPENSE:
        this.setState({
          expenses: state.expenses.filter(
            (expense) => expense.id !== action.payload,
          ),
        });
        break;

      default:
        console.warn("Unknown action:", action.type);
    }
  }
}
