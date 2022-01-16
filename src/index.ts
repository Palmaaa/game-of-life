import Cell from './models/Cell';
import Population from './models/Population';

import { getCellPosition } from './utils';

const cells: Cell[] = [];

let isRunning = false;

const canvas = document.querySelector('canvas')!;
const c = canvas.getContext('2d')!;

function setupCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  c.strokeStyle = '#ccc';
  c.lineWidth = 1;

  canvas.addEventListener('click', (event) => {
    cells.push(
      new Cell(
        c,
        getCellPosition(event.clientX),
        getCellPosition(event.clientY),
      ),
    );
  });
}

function startPopulation() {
  const population = new Population(cells);

  let tick = 1;

  function f() {
    if (tick % 5 === 0 && isRunning) {
      population.nextGeneration();
    }
    tick++;
    requestAnimationFrame(f);
  }

  f();
}

function registerKeyboardControls() {
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      isRunning = true;
      startPopulation();
    }

    if (event.key === 't') {
      isRunning = !isRunning;
    }
  });
}

function main() {
  setupCanvas();
  registerKeyboardControls();
}

main();
