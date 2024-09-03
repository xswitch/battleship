/* eslint-disable prefer-destructuring */
import Ship from "../ship";
import El from "./createEl";

class UI {
  constructor(players) {
    this.players = players;
    this.boards = [];
    [this.currentPlayer] = this.players;
    this.boardElements = [];
    this.playing = false;
  }

  createControls() {
    const controlContainer = document.querySelector(".controls");
    this.currentPlayer.ships.forEach((ship) => {
      const shipButton = new El("button", {
        classes: "shipButton",
        parent: controlContainer,
        text: ship.name,
      }).element;
      const shipAmount = new El("h2", {
        classes: "shipAmount",
        parent: controlContainer,
        text: ship.amount,
      });

      shipButton.addEventListener("click", () => {
        this.currentPlayer.selectShip(ship.name);
        console.log(ship.name, ship.amount);
        console.log(this.currentPlayer.selectedShip);
      });
    });
  }

  changePlayer() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
      this.boardElements[0].classList.remove("active");
      this.boardElements[1].classList.add("active");
    } else {
      this.currentPlayer = this.players[0];
      this.boardElements[1].classList.remove("active");
      this.boardElements[0].classList.add("active");
    }
    if (this.currentPlayer.ai === true)
      this.cellClick(
        this.currentPlayer.getValidCoordinates(),
        this.currentPlayer,
      );
  }

  findCellFromCoordinates(coordinates, board) {
    return this.boards[board][coordinates[1] * 10 + coordinates[0]];
  }

  attackCell(coordinates, player) {
    if (player !== this.currentPlayer) return false;
    if (player.gameBoard.receiveAttack(coordinates)) {
      if (player.gameBoard.allSunk()) console.log(`Win`);
      this.changePlayer();
      this.updateBoards();
    } else {
      console.log("Already Used");
    }
    return true;
  }

  placeCell(coordinates, player) {
    if (player.selectedShip.amount === 0) return;
    player.gameBoard.placeShip(
      coordinates,
      new Ship(player.selectedShip.length),
    );
    this.showShips(this.players.indexOf(player));
    console.log(`placing ${player.selectedShip.name} on [${coordinates}]`);
  }

  cellClick(coordinates, player) {
    if (this.playing === true) this.attackCell(coordinates, player);
    if (this.playing === false) this.placeCell(coordinates, player);
  }

  createBoards() {
    this.boardElements = [];
    this.players.forEach((player, index) => {
      const board = new El("div", {
        parent: document.querySelector("#content"),
        classes: "gameBoard",
      });
      this.boardElements.push(board.element);
      if (index === 0) board.element.classList.add("active");
      const cells = [];

      for (let i = 0; i < player.gameBoard.size; i += 1) {
        for (let j = 0; j < player.gameBoard.size; j += 1) {
          const gridCell = new El("div", {
            parent: board.element,
            classes: `gridCell ${i * 10 + j}`,
          });
          gridCell.element.addEventListener("click", () => {
            this.cellClick([j, i], player);
          });
          cells.push({ element: gridCell.element, coordinates: [j, i] });
        }
      }
      this.boards.push(cells);
    });
  }

  showShips(playerIndex) {
    this.players[playerIndex].gameBoard.ships.forEach((ship) => {
      const coordinates = this.createCoordinatesFromDifference(ship);
      coordinates.forEach((coordinate) => {
        this.findCellFromCoordinates(
          coordinate,
          playerIndex,
        ).element.classList.add("ship");
      });
    });
  }

  removeShips(playerIndex) {
    this.players[playerIndex].gameBoard.ships.forEach((ship) => {
      const coordinates = this.createCoordinatesFromDifference(ship);
      coordinates.forEach((coordinate) => {
        this.findCellFromCoordinates(
          coordinate,
          playerIndex,
        ).element.classList.remove("ship");
      });
    });
  }

  createCoordinatesFromDifference(ship) {
    const coordinates = {
      x: ship.x,
      y: ship.y,
      xMax: ship.xMax,
      yMax: ship.yMax,
    };
    const array = [];
    const direction = ship.x !== ship.xMax ? "x" : "y";
    for (
      let i = coordinates[direction];
      i < coordinates[`${direction}Max`];
      i += 1
    ) {
      if (direction === "x") array.push([i, ship.y]);
      if (direction === "y") array.push([ship.x, i]);
    }
    return array;
  }

  updateBoards() {
    this.boards.forEach((board, index) => {
      const player = this.players[index];
      player.gameBoard.hits.forEach((hit) => {
        this.findCellFromCoordinates(hit, index).element.classList.add("hit");
      });
      player.gameBoard.misses.forEach((miss) => {
        this.findCellFromCoordinates(miss, index).element.classList.add("miss");
      });
    });
  }
}

export default UI;
