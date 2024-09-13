import UI from "./js/DOM/domLogic";
import createOptions from "./js/DOM/options";
import Player from "./js/player";
import "./style.css";
import "toastify-js/src/toastify.css";

function driver() {
  const ships = [
    { name: "Destroyer", length: 2, amount: 2 },
    { name: "Submarine", length: 3, amount: 2 },
    { name: "Cruiser", length: 3, amount: 1 },
    { name: "Battleship", length: 4, amount: 1 },
    { name: "Carrier", length: 5, amount: 1 },
  ];
  const players = [new Player(), new Player(true)];
  const ui = new UI(players);
  createOptions(ships);
}

driver();
