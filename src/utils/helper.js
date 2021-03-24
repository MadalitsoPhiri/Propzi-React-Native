export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function randomizeArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
