import { CellsStatus } from '../tests/cell.test';

export class Cell {
  private constructor(readonly status: CellsStatus) {}

  static create(status: CellsStatus): Cell {
    if (status === undefined || status === null) {
      throw new Error('Cell status cannot be undefined or null');
    }
    return new Cell(status);
  }

  regenerate(numberOfNeighbors: number) {
    const nextStatus =
      this.status === CellsStatus.ALIVE
        ? this.statusForAlive(numberOfNeighbors)
        : this.statusForDead(numberOfNeighbors);
    return new Cell(nextStatus);
  }

  isAlive(): boolean {
    return this.status === CellsStatus.ALIVE;
  }

  private statusForAlive(numberOfNeighbors: number) {
    const isStablePopulation = numberOfNeighbors < 2 || numberOfNeighbors > 3;
    return isStablePopulation ? CellsStatus.DEAD : CellsStatus.ALIVE;
  }

  private statusForDead(numberOfNeighbors: number) {
    const isFertilePopulation = numberOfNeighbors === 3;
    return isFertilePopulation ? CellsStatus.ALIVE : CellsStatus.DEAD;
  }
}
