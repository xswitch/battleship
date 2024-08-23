import El from "./createEl";

class UI {
  constructor(players) {
    this.players = players;
    this.boards = [];
  }

  findCellFromCoordinates(coordinates, board) {
    return this.boards[board][coordinates[1] * 10 + coordinates[0]];
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
          cells.push({ element: gridCell.element, coordinates: [j, i] });
        }
      }
      this.boards.push(cells);
    });
  }

  displayShips(player) {
    console.log(player);
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
