import El from "./createEl";

class UI {
  constructor(players) {
    this.players = players;
    this.boards = [];
  }

  findCellFromCoordinates(coordinates) {
    return coordinates[1] * 10 + coordinates[0];
  }

  renderPlayers() {
    this.players.forEach((player) => this.renderBoard(player));
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
            classes: `gridCell ${this.findCellFromCoordinates([j, i])}`,
          });
          cells.push({ element: gridCell.element, coordinates: [j, i] });
        }
      }
      this.boards.push(cells);
    });
  }
}

export default UI;
