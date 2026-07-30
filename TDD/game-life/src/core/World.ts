import { Cell } from './Cell';
import { CellsStatus } from '../tests/cell.test';

export class World {
  constructor(readonly cellMatrix: Cell[][]) {}

  static createForm(initialStatus: CellsStatus[][]) {
    let cellMatrix = initialStatus.map((row) => row.map((cellStatus) => Cell.create(cellStatus)));
    return new World(cellMatrix);
  }

  nextGeneration(): World {
    const nextGenerationCellMatrix = this.cellMatrix.map((row, rowIndex) =>
      row.map((cell, columnIndex) => cell.regenerate(this.getAliveNeighbors(rowIndex, columnIndex)))
    );
    return new World(nextGenerationCellMatrix);
  }

  getAliveNeighbors(row: number, col: number): number {
    return this.aliveRowNeightbors(row, col) + this.aliveColumnNeighbors(col, row);
  }

  private aliveRowNeightbors(row: number, col: number) {
    let aliveNeighbors = 0;
    const nextRow = row + 1;
    const previousRow = row - 1;
    if (previousRow >= 0) {
      if (this.isAliveCellAt(previousRow, col)) aliveNeighbors++;
      aliveNeighbors += this.aliveColumnNeighbors(col, previousRow);
    }
    if (nextRow < this.cellMatrix.length) {
      if (this.isAliveCellAt(nextRow, col)) aliveNeighbors++;
      aliveNeighbors += this.aliveColumnNeighbors(col, nextRow);
    }
    return aliveNeighbors;
  }

  private aliveColumnNeighbors(col: number, row: number) {
    let aliveNeighbors = 0;
    const previousCol = col - 1;
    const nextCol = col + 1;
    if (previousCol >= 0 && this.isAliveCellAt(row, previousCol)) aliveNeighbors++;
    if (nextCol < this.cellMatrix[row].length && this.isAliveCellAt(row, nextCol)) aliveNeighbors++;
    return aliveNeighbors;
  }

  private isAliveCellAt(row: number, col: number): boolean {
    return this.cellMatrix[row][col].isAlive();
  }
}
