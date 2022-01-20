import { cell } from '../config';
import Cell from '../models/Cell';

export function getCellPosition(coordinate: number) {
  return cell.size * (Math.ceil(coordinate / cell.size) - 1);
}

export function alreadyHasCellAt(x: number, y: number, cells: Cell[]) {
  return Boolean(cells.find((c) => c.x === x && c.y === y));
}
