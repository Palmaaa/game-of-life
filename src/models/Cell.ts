class Cell {
  private width: number;

  private height: number;

  x: number;

  y: number;

  c: CanvasRenderingContext2D;

  dx: number;

  dy: number;

  constructor(c: CanvasRenderingContext2D, x: number, y: number, sideLength: number) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.width = sideLength;
    this.height = sideLength;
    this.dx = sideLength;
    this.dy = sideLength;

    this.draw();
  }

  draw() {
    this.c.fillRect(this.x, this.y, this.width, this.height);
    this.c.strokeRect(this.x, this.y, this.width, this.height);
  }

  die() {
    this.c.clearRect(this.x, this.y, this.width, this.height);
  }

  shouldDie(cells: Cell[]) {
    const numberOfNeighbours = this.getNumberOfNeighbours(cells);
    return numberOfNeighbours < 2 || numberOfNeighbours > 3;
  }

  getNumberOfNeighbours(cells: Cell[]) {
    let n = 0;
    cells.forEach((cell) => {
      if (
        (cell.x === this.x - this.width && cell.y === this.y - this.height)
        || (cell.x === this.x - this.width && cell.y === this.y)
        || (cell.x === this.x - this.width && cell.y === this.y + this.height)
        || (cell.x === this.x && cell.y === this.y - this.height)
        || (cell.x === this.x && cell.y === this.y + this.height)
        || (cell.x === this.x + this.width && cell.y === this.y - this.height)
        || (cell.x === this.x + this.width && cell.y === this.y)
        || (cell.x === this.x + this.width && cell.y === this.y + this.height)
      ) {
        n++;
      }
    });

    return n;
  }
}

export default Cell;
