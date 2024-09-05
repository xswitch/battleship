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
    this.controlElements = [];
    this.hoveringCells = [];
  }

  updateControls() {
    this.controlElements.forEach((entry, index) => {
      if (this.currentPlayer.ships[index] !== undefined) {
        const currentEntry = this.controlElements[index];
        currentEntry.name.textContent = this.currentPlayer.ships[index].name;
        currentEntry.amount.textContent =
          this.currentPlayer.ships[index].amount;
      } else {
        entry.name.remove();
        entry.amount.remove();
      }
    });
  }

  createControls() {
    const controlColumn = document.querySelector(".controls");
    const controlContainer = new El("div", {
      classes: "shipTable",
      parent: controlColumn,
    }).element;
    const controlNameTitle = new El("h2", {
      classes: "shipTableTitle ti",
      text: "Name",
      parent: controlContainer,
    });
    const controlNameAmount = new El("h2", {
      classes: "shipTableTitle ti",
      text: "#",
      parent: controlContainer,
    });
    this.currentPlayer.ships.forEach((ship, index) => {
      const elements = {
        name: new El("h2", {
          classes: "shipName ti",
          parent: controlContainer,
          text: ship.name,
        }).element,
        amount: new El("h2", {
          classes: "shipAmount ti",
          parent: controlContainer,
          text: ship.amount,
        }).element,
      };
      if (index === 0) {
        elements.name.classList.add("shipTableCurrent");
        elements.amount.classList.add("shipTableCurrent");
      }
      this.controlElements.push(elements);
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
    if (player.ships.length === 0) return;
    if (
      player.gameBoard.placeShip(coordinates, new Ship(player.ships[0].length))
    )
      player.useShip();

    this.showShips(this.players.indexOf(player));
    this.updateControls();
    if (
      this.players[0].ships.length === 0 &&
      this.players[1].ships.length === 0
    )
      this.playing = true;
    if (this.currentPlayer.ships.length === 0) this.changePlayer();
    if (this.currentPlayer.ai === true)
      this.cellClick(
        this.currentPlayer.getValidCoordinates(),
        this.currentPlayer,
      );
  }

  cellClick(coordinates, player) {
    if (player !== this.currentPlayer) return;
    if (this.playing === true) this.attackCell(coordinates, player);
    if (this.playing === false) this.placeCell(coordinates, player);
  }

  cellEnter(player, coordinates) {
    if (player === this.currentPlayer && this.playing === false) {
      const coordinateArray = player.gameBoard.createCoordinatesFromDifference(
        player.gameBoard.createShipMeasurements(
          coordinates,
          player.ships[0].length,
          "x",
        ),
      ); // Creates an array of all the ships positions
      if (
        coordinateArray.some((coordinate) =>
          player.gameBoard.outOfBounds(coordinate[0], coordinate[1]),
        )
      )
        return;
      // Checks wether any of them are out of bounds
      coordinateArray.forEach((coordinate) => {
        this.hoveringCells.push(
          this.findCellFromCoordinates(coordinate, this.players.indexOf(player))
            .element,
        );
      }); // Gets all the elements based on coordinates
      this.hoveringCells.forEach((cell) => cell.classList.add("active"));
    }
  }

  cellLeave() {
    this.hoveringCells.forEach((cell) => {
      cell.classList.remove("active");
    });
    this.hoveringCells = [];
  }

  cellInit(coordinates, player, board) {
    const gridCell = new El("div", {
      parent: board.element,
      classes: `gridCell ${coordinates[1] * 10 + coordinates[0]}`,
    });
    gridCell.element.addEventListener("click", () => {
      this.cellClick(coordinates, player);
    });
    gridCell.element.addEventListener("mouseenter", () => {
      this.cellEnter(player, coordinates);
    });
    gridCell.element.addEventListener("mouseleave", () => {
      this.cellLeave();
    });
    return gridCell.element;
  }

  createBoards() {
    this.boardElements = [];
    this.players.forEach((player, index) => {
      const board = new El("div", {
        parent: document.querySelector(`.boardContainer${index + 1}`),
        classes: "gameBoard",
      });
      if (index === 0) board.element.classList.add("active");
      this.boardElements.push(board.element);
      const cells = [];

      for (let i = 0; i < player.gameBoard.size; i += 1) {
        for (let j = 0; j < player.gameBoard.size; j += 1) {
          const gridCell = this.cellInit([j, i], player, board);
          cells.push({ element: gridCell, coordinates: [j, i] });
        }
      }
      this.boards.push(cells);
    });
  }

  showShips(playerIndex) {
    this.players[playerIndex].gameBoard.ships.forEach((ship) => {
      const coordinates =
        this.players[playerIndex].gameBoard.createCoordinatesFromDifference(
          ship,
        );
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
      const coordinates =
        this.players[playerIndex].gameBoard.createCoordinatesFromDifference(
          ship,
        );
      coordinates.forEach((coordinate) => {
        this.findCellFromCoordinates(
          coordinate,
          playerIndex,
        ).element.classList.remove("ship");
      });
    });
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
