import toast from "../notification";

function validateInputs(ships, inputs) {
  const length = inputs.length.element.value;
  const amount = inputs.amount.element.value;
  const name = inputs.name.element.value;
  const currentSize = ships.reduce(
    (previous, current) => previous + current.length * current.amount,
    0,
  );
  const newSize = currentSize + length * amount;

  if (newSize < 100 && length <= 10 && length > 0) return true;

  if (newSize > 100) toast.error("Exceeded total size");
  if (length > 10) toast.error("Max Length Exceeded");
  if (length <= 0) toast.error("Invalid Length");
  if (name === "") toast.error("Enter Name");
  return false;
}

export default validateInputs;
