import "./style.css";
import { Board } from "./component/board/Board";
const app = document.getElementById("app");

new Board(app);
 
console.log("Kanban Board application successfully started!");