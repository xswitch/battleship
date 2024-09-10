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
    document.addEventListener("keydown", (event) => {
      this.rotateShip(event);
    });
  }

  rotateShip(event) {
    if (this.playing === true) return;
    const key = event.key;
    if (key === "r") this.currentPlayer.changeRotation();
    if (this.hoveringCells.length !== 0) {
      const currentCell = this.hoveringCells[0].coordinates;
      this.cellLeave();
      this.cellEnter(this.currentPlayer, currentCell);
    }
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
    this.currentPlayer.ships.forEach((ship, index) => {
      const itemContainer = new El("div", {
        classes: "tiContainer",
        parent: controlContainer,
      }).element;
      const elements = {
        name: new El("h2", {
          classes: "shipName ti",
          parent: itemContainer,
          text: ship.name,
        }).element,
        amount: new El("h2", {
          classes: "shipAmount ti",
          parent: itemContainer,
          text: ship.amount,
        }).element,
      };
      elements.container = itemContainer;
      if (index === 0) {
        elements.container.classList.add("shipTableCurrent");
      }
      this.controlElements.push(elements);
    });
  }

  removeControls() {
    this.controlElements.forEach((control) => {
      const element = control.container;
      element.remove();
    });
  }

  changePlayer() {
    const oldPlayer = this.currentPlayer;
    this.removeShips();
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
      this.boardElements[1].classList.remove("active");
      this.boardElements[0].classList.add("active");
    } else {
      this.currentPlayer = this.players[0];
      this.boardElements[0].classList.remove("active");
      this.boardElements[1].classList.add("active");
    }
    if (this.currentPlayer.ai === true)
      this.cellClick(oldPlayer.getValidCoordinates(), oldPlayer);

    this.showShips();
  }

  findCellFromCoordinates(coordinates, board) {
    return this.boards[board][coordinates[1] * 10 + coordinates[0]];
  }

  attackCell(coordinates, player) {
    if (player.gameBoard.receiveAttack(coordinates)) {
      if (player.gameBoard.allSunk()) console.log(`Win`);
      this.changePlayer();
      this.updateBoards();
      this.cellLeave();
    } else {
      console.log("Already Used");
    }
    return true;
  }

  placeCell(coordinates, player) {
    if (player.ships.length === 0) return;
    if (
      player.gameBoard.placeShip(
        coordinates,
        new Ship(player.ships[0].length),
        player.direction,
      )
    ) {
      player.useShip();
      this.cellLeave();
    }

    this.showShips(this.players.indexOf(player));
    this.updateControls();
    if (
      this.players[0].ships.length === 0 &&
      this.players[1].ships.length === 0
    )
      this.startGame();
    if (this.currentPlayer.ships.length === 0) this.changePlayer();
    if (this.currentPlayer.ai === true)
      this.cellClick(
        this.currentPlayer.getValidCoordinates(),
        this.currentPlayer,
      );
  }

  startGame() {
    this.playing = true;
    this.removeControls();
  }

  findHumanPlayer() {
    return this.players.filter((player) => player.ai === false);
  }

  cellClick(coordinates, player) {
    if (player !== this.currentPlayer && this.playing === false) return;
    if (player === this.currentPlayer && this.playing === true) return;
    if (this.playing === true) this.attackCell(coordinates, player);
    if (this.playing === false) this.placeCell(coordinates, player);
  }

  cellEnter(player, coordinates) {
    // When playing display invalid and valid shots
    if (player !== this.currentPlayer && this.playing === true) {
      const cell = this.findCellFromCoordinates(
        coordinates,
        this.players.indexOf(player),
      );
      const usedLocation = player.gameBoard.isAlreadyUsed(coordinates);
      if (usedLocation) {
        cell.element.classList.add("invalid");
      } else {
        cell.element.classList.add("valid");
      }
      this.hoveringCells.push(cell);
    }
    // Creates an array of all the ships positions
    if (player === this.currentPlayer && this.playing === false) {
      let coordinateArray = player.gameBoard.createCoordinatesFromDifference(
        player.gameBoard.createShipMeasurements(
          coordinates,
          player.ships[0].length,
          player.direction,
        ),
      );
      // Checks wether any of them are out of bounds
      let tooBig = false;
      if (
        coordinateArray.some((coordinate) =>
          player.gameBoard.outOfBounds(coordinate[0], coordinate[1]),
        )
      ) {
        coordinateArray = coordinateArray.filter(
          (coordinate) =>
            player.gameBoard.outOfBounds(coordinate[0], coordinate[1]) ===
            false,
        );
        tooBig = true;
      }
      // Gets all the elements based on coordinates
      coordinateArray.forEach((coordinate) => {
        this.hoveringCells.push(
          this.findCellFromCoordinates(
            coordinate,
            this.players.indexOf(player),
          ),
        );
      });
      this.hoveringCells.forEach((cell) => {
        if (player.gameBoard.checkForShip(cell.coordinates) || tooBig) {
          cell.element.classList.add("invalid");
        } else {
          cell.element.classList.add("valid");
        }
      });
    }
  }

  cellLeave() {
    this.hoveringCells.forEach((cell) => {
      cell.element.classList.remove("valid");
      cell.element.classList.remove("invalid");
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

  showShips() {
    // Shows current players ships
    this.currentPlayer.gameBoard.ships.forEach((ship) => {
      const coordinates =
        this.currentPlayer.gameBoard.createCoordinatesFromDifference(ship);
      coordinates.forEach((coordinate) => {
        this.findCellFromCoordinates(
          coordinate,
          this.players.indexOf(this.currentPlayer),
        ).element.classList.add("ship");
      });
    });
  }

  removeShips() {
    // Removes current players ships
    this.currentPlayer.gameBoard.ships.forEach((ship) => {
      const coordinates =
        this.currentPlayer.gameBoard.createCoordinatesFromDifference(ship);
      coordinates.forEach((coordinate) => {
        this.findCellFromCoordinates(
          coordinate,
          this.players.indexOf(this.currentPlayer),
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
