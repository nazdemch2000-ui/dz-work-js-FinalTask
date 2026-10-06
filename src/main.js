import "./style.css";
import { Store } from "./component/core/Store";
import { initialState } from "./component/state/State";
import { StorageService } from "./component/services/StorageServises";
import { Board } from "./component/board/Board";

const savedState = StorageService.load();
const app = savedState || initialState;

const store = new Store(app);

store.subscribe((state) => {
  StorageService.save(state);
});

const appCont = document.querySelector("#app");
const board = new Board(appCont, store);
