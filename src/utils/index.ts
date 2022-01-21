import Cell from '../models/Cell';

export function getCellPosition(coordinate: number, cellSideLength: number) {
  return cellSideLength * (Math.ceil(coordinate / cellSideLength) - 1);
}

export function alreadyHasCellAt(x: number, y: number, cells: Cell[]) {
  return Boolean(cells.find((c) => c.x === x && c.y === y));
}
