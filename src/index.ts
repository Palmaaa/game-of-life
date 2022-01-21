import Cell from './models/Cell';
import Population from './models/Population';

import { alreadyHasCellAt, getCellPosition } from './utils';

let cells: Cell[] = [];

let cellSideLength: number;

let isRunning = false;

let requestId: number;

const canvas = document.querySelector('canvas')!;
const c = canvas.getContext('2d')!;

function setupCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  c.strokeStyle = '#ccc';
  c.lineWidth = 1;

  while (!cellSideLength) {
    cellSideLength = Number(prompt('Enter the cell\'s side length (in px)')!);
  }

  canvas.addEventListener('click', (event) => {
    const x = getCellPosition(event.clientX, cellSideLength);
    const y = getCellPosition(event.clientY, cellSideLength);

    if (!isRunning && !alreadyHasCellAt(x, y, cells)) {
      cells.push(
        new Cell(
          c,
          x,
          y,
          cellSideLength,
        ),
      );
    }
  });
}

function startPopulation() {
  const population = new Population(cells, cellSideLength);

  let tick = 1;

  function f() {
    if (tick % 5 === 0 && isRunning) {
      population.nextGeneration();
    }
    tick++;
    requestId = requestAnimationFrame(f);
  }

  f();
}

const keyboardActions: { [k: string]: () => void } = {
  Enter: () => {
    isRunning = true;
    startPopulation();
  },
  t: () => {
    isRunning = !isRunning;
  },
  r: () => {
    isRunning = false;
    cells = [];
    cancelAnimationFrame(requestId);
    c.clearRect(0, 0, canvas.width, canvas.height);
  },
};

function registerKeyboardControls() {
  document.addEventListener('keyup', (event) => {
    keyboardActions[event.key]();
  });
}

function main() {
  setupCanvas();
  registerKeyboardControls();
}

main();
