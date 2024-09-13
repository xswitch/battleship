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
    titleRow: {},
    ships: [],
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
  ships.forEach((ship) => {
    const container = new El("div", {
      classes: "optionsRow",
      parent: shipOptions.container,
    }).element;
    const newShip = {
      name: new El("h2", {
        classes: "optionsText",
        parent: container,
        text: ship.name,
      }),
      length: new El("h2", {
        classes: "optionsText",
        parent: container,
        text: ship.length,
      }),
      amount: new El("h2", {
        classes: "optionsText",
        parent: container,
        text: ship.amount,
      }),
    };
    newShip.container = container;
    shipOptions.ships.push(newShip);
  });
  return shipOptions;
}

export default createOptions;
