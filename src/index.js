import UI from "./js/DOM/domLogic";
import Player from "./js/player";
import "./style.css";

const driver = (() => {
  const players = [new Player(), new Player(true)];
  const ui = new UI(players);

  ui.createBoards();
  ui.createControls();

  ui.updateBoards();
  ui.showShips(1);
  ui.showShips(0);
})();
