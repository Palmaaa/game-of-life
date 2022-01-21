import Cell from './Cell';

const canvas = document.querySelector('canvas')!;

const c = canvas.getContext('2d')!;

class Population {
  cellSideLength: number;

  aliveCells: Cell[];

  deadCellsIndexes: number[] = [];

  newBornCells: Cell[] = [];

  generationCounter = 1;

  constructor(aliveCells: Cell[], cellSideLength: number) {
    this.aliveCells = aliveCells;
    this.cellSideLength = cellSideLength;
  }

  nextGeneration() {
    for (let x = 0; x < window.innerWidth; x += this.cellSideLength) {
      for (let y = 0; y < window.innerHeight; y += this.cellSideLength) {
        const cell = this.findCellAt(x, y);

        if (cell) {
          this.handleAliveCell(cell);
        } else {
          this.handleDeadCellAt(x, y);
        }
      }
    }

    this.cleanDeadCells();
    this.aliveCells = [...this.aliveCells, ...this.newBornCells];
    this.newBornCells = [];
    this.deadCellsIndexes = [];
    this.generationCounter++;
  }

  findCellAt(x: number, y: number): Cell | undefined {
    return this.aliveCells.find((cell) => cell.x === x && cell.y === y);
  }

  handleDeadCellAt(x: number, y: number) {
    if (this.shouldBecomeAliveCellAt(x, y)) {
      this.newBornCells.push(new Cell(c, x, y, this.cellSideLength));
    }
  }

  shouldBecomeAliveCellAt(x: number, y: number): boolean {
    let n = 0;
    this.aliveCells.forEach((cell) => {
      if (
        (cell.x === x - this.cellSideLength && cell.y === y - this.cellSideLength)
        || (cell.x === x - this.cellSideLength && cell.y === y)
        || (cell.x === x - this.cellSideLength && cell.y === y + this.cellSideLength)
        || (cell.x === x && cell.y === y - this.cellSideLength)
        || (cell.x === x && cell.y === y + this.cellSideLength)
        || (cell.x === x + this.cellSideLength && cell.y === y - this.cellSideLength)
        || (cell.x === x + this.cellSideLength && cell.y === y)
        || (cell.x === x + this.cellSideLength && cell.y === y + this.cellSideLength)
      ) {
        n++;
      }
    });

    return n === 3;
  }

  handleAliveCell(cell: Cell) {
    if (cell.shouldDie(this.aliveCells)) {
      cell.die();
      const deadCellIndex = this.aliveCells.findIndex(
        (aliveCell) => aliveCell.x === cell.x && aliveCell.y === cell.y,
      );
      this.deadCellsIndexes.push(deadCellIndex);
    }
  }

  cleanDeadCells() {
    this.deadCellsIndexes.sort((a, b) => a - b);
    for (let i = this.deadCellsIndexes.length - 1; i >= 0; i--) {
      this.aliveCells.splice(this.deadCellsIndexes[i], 1);
    }
  }
}

export default Population;
