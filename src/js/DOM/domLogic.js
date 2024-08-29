import El from "./createEl";

class UI {
  constructor(players) {
    this.players = players;
    this.boards = [];
    this.currentPlayer = 0;
  }

  changePlayer() {
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
    } else {
      this.currentPlayer = 0;
    }
  }

  findCellFromCoordinates(coordinates, board) {
    return this.boards[board][coordinates[1] * 10 + coordinates[0]];
  }

  cellClick(e, coordinates) {
    this.players[this.currentPlayer].gameBoard.receiveAttack(coordinates);
    this.updateBoards();
  }

  createBoards() {
    this.players.forEach((player) => {
      const board = new El("div", {
        parent: document.querySelector("#content"),
        classes: "gameBoard",
      });
      const cells = [];

      for (let i = 0; i < player.gameBoard.size; i += 1) {
        for (let j = 0; j < player.gameBoard.size; j += 1) {
          const gridCell = new El("div", {
            parent: board.element,
            classes: `gridCell ${i * 10 + j}`,
          });
          gridCell.element.addEventListener("click", (event) => {
            this.cellClick(event, [j, i]);
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
      i <= coordinates[`${direction}Max`];
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
