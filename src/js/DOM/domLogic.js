/* eslint-disable prefer-destructuring */
import toast from "../notification";
import Player from "../player";
import Ship from "../ship";
import El from "./createEl";
import createOptions from "./options";

class UI {
  #ships = [
    { name: "Destroyer", length: 2, amount: 2 },
    { name: "Submarine", length: 3, amount: 2 },
    { name: "Cruiser", length: 3, amount: 1 },
    { name: "Battleship", length: 4, amount: 1 },
    { name: "Carrier", length: 5, amount: 1 },
  ];

  constructor() {
    this.options = createOptions(this.#ships);
    this.players = [];
    this.boards = [];
    this.info = [];
    this.currentPlayer = undefined;
    this.boardElements = [];
    this.playing = false;
    this.controlElements = [];
    this.hoveringCells = [];
    this.tabs = {
      startScreen: document.querySelector(".startScreen"),
      content: document.querySelector(".content"),
      endScreen: document.querySelector(".endScreen"),
    };
    document.addEventListener("keydown", (event) => {
      this.rotateShip(event);
    });
    this.setupButtons();
  }

  setupButtons() {
    const buttons = {
      start: document.querySelector(".startGame"),
      newGame: document.querySelector(".newGame"),
      home: document.querySelector(".home"),
    };
    buttons.start.addEventListener("click", () => this.startGame());
    buttons.newGame.addEventListener("click", () => this.startGame());
    buttons.home.addEventListener("click", () => this.home());
  }

  home() {
    this.tabs.startScreen.classList.remove("hidden");
    this.tabs.endScreen.classList.add("hidden");
  }

  startGame() {
    /*
    this players = getPlayers()
    [this.currentPlayer] = this.players
    */
    this.#ships = this.options.getShips();
    if (this.#ships.length === 0) {
      toast.error("NO SHIPS");
      return;
    }
    this.players = [
      new Player(this.options.getShips(), false),
      new Player(this.options.getShips(), true),
    ];
    [this.currentPlayer] = this.players;
    this.tabs.startScreen.classList.add("hidden");
    this.tabs.content.classList.remove("hidden");
    this.tabs.endScreen.classList.add("hidden");
    this.createBoards();
    this.createControls();
    this.createInfo();
  }

  endGame() {
    // this.currentPlayer is the player that is currently attacking, so if i win it's me
    this.cellLeave();
    this.updateResults();
    this.playing = false;
    this.players = [];
    this.currentPlayer = undefined;
    this.boardElements.forEach((board) => board.remove());
    this.removeControls();
    this.boardElements = [];
    this.boards = [];
    this.controlElements = [];
    this.tabs.content.classList.add("hidden");
    this.tabs.endScreen.classList.remove("hidden");
  }

  updateResults() {
    const resultText = document.querySelector(".results");
    console.log(this.currentPlayer);
    if (this.currentPlayer.ai === true) {
      resultText.textContent = "AI Won!";
    } else {
      resultText.textContent = "You Won!";
    }
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
    if (this.currentPlayer.ai === true) {
      if (oldPlayer.gameBoard.getLast().type === "hit") {
        this.cellClick(oldPlayer.getRandomNearby(), oldPlayer);
      } else {
        this.cellClick(oldPlayer.getValidCoordinates(), oldPlayer);
      }
    }

    this.showShips();
  }

  findCellFromCoordinates(coordinates, board) {
    return this.boards[board][coordinates[1] * 10 + coordinates[0]];
  }

  attackToast(player) {
    const lastShot = player.gameBoard.getLast();
    const playerSide = this.players.indexOf(player) === 0 ? "left" : "right";
    switch (lastShot.type) {
      case "hit":
        toast.success("Hit!", playerSide);
        break;
      case "miss":
        toast.info("Miss!", playerSide);
        break;
      case "sunk":
        toast.success("Ship sunk!", playerSide);
        break;
      default:
        break;
    }
  }

  attackCell(coordinates, player) {
    if (player.gameBoard.receiveAttack(coordinates)) {
      if (player.gameBoard.allSunk()) {
        this.endGame();
        return false;
      }
      this.updateInfo();
      this.changePlayer();
      this.updateBoards();
      this.cellLeave();
      this.attackToast(player);
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
    } else if (player.ai !== true) toast.error("Invalid Placement");

    this.showShips(this.players.indexOf(player));
    this.updateControls();
    if (
      this.players[0].ships.length === 0 &&
      this.players[1].ships.length === 0
    )
      this.startPlaying();
    if (this.currentPlayer.ships.length === 0) this.changePlayer();
    if (this.currentPlayer.ai === true)
      this.cellClick(
        this.currentPlayer.getValidCoordinates(),
        this.currentPlayer,
      );
  }

  startPlaying() {
    this.playing = true;
    this.removeControls();
    this.updateInfo();
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
        const cell = this.findCellFromCoordinates(
          coordinate,
          this.players.indexOf(player),
        );
        cell.style = cell.element.style.cssText;
        this.hoveringCells.push(cell);
      });
      this.hoveringCells.forEach((cell) => {
        if (player.gameBoard.checkForShip(cell.coordinates) || tooBig) {
          cell.element.classList.add("invalid");
          cell.element.style = "";
        } else {
          cell.element.classList.add("valid");
          cell.element.style = "";
        }
      });
    }
  }

  cellLeave() {
    this.hoveringCells.forEach((cell) => {
      cell.element.classList.remove("valid");
      cell.element.classList.remove("invalid");
      cell.element.style = cell.style;
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
      coordinates.forEach((coordinate, index) => {
        const cell = this.findCellFromCoordinates(
          coordinate,
          this.players.indexOf(this.currentPlayer),
        ).element;
        cell.classList.add("ship");
        cell.classList.remove("gridCell");
        cell.style = this.createShipBorders(ship, index);
      });
    });
  }

  createShipBorders(ship, index) {
    const properties = {
      color: "gray",
      width: "1px",
    };
    const length = ship.ship.length - 1;
    if (ship.direction === "x") {
      if (index === 0)
        return `border-bottom: ${properties.width} solid ${properties.color}; border-top: ${properties.width} solid ${properties.color}; border-left: ${properties.width} solid ${properties.color};`;
      if (index === length)
        return `border-bottom: ${properties.width} solid ${properties.color}; border-top: ${properties.width} solid ${properties.color}; border-right: ${properties.width} solid ${properties.color};`;
      return `border-bottom: ${properties.width} solid ${properties.color}; border-top: ${properties.width} solid ${properties.color};`;
    }
    if (index === 0)
      return `border-left: ${properties.width} solid ${properties.color}; border-top: ${properties.width} solid ${properties.color}; border-right: ${properties.width} solid ${properties.color};`;
    if (index === length)
      return `border-bottom: ${properties.width} solid ${properties.color}; border-right: ${properties.width} solid ${properties.color}; border-left: ${properties.width} solid ${properties.color};`;
    return `border-left: ${properties.width} solid ${properties.color}; border-right: ${properties.width} solid ${properties.color};`;
  }

  removeShips() {
    // Removes current players ships
    this.currentPlayer.gameBoard.ships.forEach((ship) => {
      const coordinates =
        this.currentPlayer.gameBoard.createCoordinatesFromDifference(ship);
      coordinates.forEach((coordinate) => {
        const cell = this.findCellFromCoordinates(
          coordinate,
          this.players.indexOf(this.currentPlayer),
        ).element;
        cell.classList.remove("ship");
        cell.classList.add("gridCell");
        cell.style = "";
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

  createInfo() {
    for (let index = 0; index < this.players.length; index += 1) {
      const boardElement = document.querySelector(
        `.boardContainer${index + 1}`,
      );
      const infoContainer = new El("div", {
        classes: "infoContainer",
        parent: boardElement,
      });
      this.info[index] = {
        container: infoContainer,
        shipsLeft: new El("h2", {
          classes: "infoText",
          parent: infoContainer.element,
          text: ``,
        }),
      };
    }
  }

  updateInfo() {
    for (let index = 0; index < this.players.length; index += 1) {
      const player = this.players[index];
      this.info[index].shipsLeft.text =
        `Ships left: ${player.gameBoard.remainingShips()}`;
    }
  }
}

export default UI;
