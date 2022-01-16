import { cell } from '../config';

export function getCellPosition(coordinate: number) {
  return cell.size * (Math.ceil(coordinate / cell.size) - 1);
}
