import { ship } from "./test";

it("should give the ship a length", () => {
  const newShip = ship(5);
  expect(newShip).toBe(typeof "object");
});
