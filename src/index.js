import UI from "./js/DOM/domLogic";
import Player from "./js/player";
import "./style.css";

function driver() {
  const players = [new Player(), new Player(true)];
  const ui = new UI(players);
}

driver();
