import El from "./createEl";

function createOptions(ships) {
  const optionsContainer = new El("div", {
    classes: "optionsContainer",
    parent: ".options",
  }).element;
  const shipOptions = {
    container: new El("div", {
      classes: "shipOptions",
      parent: optionsContainer,
    }).element,
    inputContainer: new El("div", {
      classes: "shipOptions",
      parent: optionsContainer,
    }),
    titleRow: {},
    ships: [],
    inputs: {},
  };
  shipOptions.title = new El("h1", {
    classes: "optionsTitle",
    parent: shipOptions.container,
    text: "SHIPS",
  });
  shipOptions.titleRow.container = new El("div", {
    classes: "optionsRow titleRow",
    parent: shipOptions.container,
  }).element;

  shipOptions.titleRow.name = new El("h2", {
    classes: "optionsText, optionsTitle",
    text: "NAME",
    parent: shipOptions.titleRow.container,
  });
  shipOptions.titleRow.length = new El("h2", {
    classes: "optionsText, optionsTitle",
    text: "LENGTH",
    parent: shipOptions.titleRow.container,
  });
  shipOptions.titleRow.amount = new El("h2", {
    classes: "optionsText, optionsTitle",
    text: "AMOUNT",
    parent: shipOptions.titleRow.container,
  });

  function addShip(name, length, amount) {
    const container = new El("div", {
      classes: "optionsRow option",
      parent: shipOptions.container,
    }).element;
    const newShip = {
      name: new El("h2", {
        classes: "optionsText",
        parent: container,
        text: name,
      }),
      length: new El("h2", {
        classes: "optionsText",
        parent: container,
        text: length,
      }),
      amount: new El("h2", {
        classes: "optionsText",
        parent: container,
        text: amount,
      }),
    };
    newShip.container = container;
    shipOptions.ships.push(newShip);
  }

  ships.forEach((ship) => {
    addShip(ship.name, ship.length, ship.amount);
  });

  shipOptions.inputs.container = new El("div", {
    classes: "optionsRow",
    parent: shipOptions.inputContainer.element,
  }).element;
  shipOptions.inputs.buttonContainer = new El("div", {
    classes: "optionsRow",
    parent: shipOptions.inputContainer.element,
  }).element;
  shipOptions.inputs = {
    name: new El("input", {
      classes: "optionsInput",
      parent: shipOptions.inputs.container,
      properties: {
        placeholder: "NAME",
      },
    }),
    length: new El("input", {
      classes: "optionsInput",
      parent: shipOptions.inputs.container,
      properties: {
        placeholder: "LENGTH",
      },
    }),
    amount: new El("input", {
      classes: "optionsInput",
      parent: shipOptions.inputs.container,
      properties: {
        placeholder: "AMOUNT",
      },
    }),
    button: new El("button", {
      classes: "optionsButton",
      parent: shipOptions.inputs.buttonContainer,
      text: "NEW SHIP",
    }),
  };

  shipOptions.inputs.button.element.addEventListener("click", () => {
    addShip(
      shipOptions.inputs.name.element.value,
      shipOptions.inputs.length.element.value,
      shipOptions.inputs.amount.element.value,
    );
  });

  function getShips() {
    return shipOptions.ships.map((ship) => ({
      name: ship.name.text,
      length: ship.length.text,
      amount: ship.amount.text,
    }));
  }
  return { getShips };
}

export default createOptions;
