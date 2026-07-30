/*
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any dead cell with exactly three live neighbors becomes a live cell.
 */

import { Cell } from '../core/Cell';

export enum CellsStatus {
  DEAD = 0,
  ALIVE = 1,
}

describe('In the game life', () => {
  it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', () => {
    expect(Cell.create(CellsStatus.ALIVE).regenerate(1).isAlive()).toBe(false);
    expect(Cell.create(CellsStatus.DEAD).regenerate(1).isAlive()).toBe(false);
  });
  it('Any live cell with two or three live neighbors lives on to the next generation', () => {
    expect(Cell.create(CellsStatus.ALIVE).regenerate(2).isAlive()).toBe(true);
    expect(Cell.create(CellsStatus.ALIVE).regenerate(3).isAlive()).toBe(true);
  });
  it('Any live cell with more than three live neighbors dies, as if by overcrowding', () => {
    expect(Cell.create(CellsStatus.ALIVE).regenerate(4).isAlive()).toBe(false);
    expect(Cell.create(CellsStatus.ALIVE).regenerate(5).isAlive()).toBe(false);
    expect(Cell.create(CellsStatus.DEAD).regenerate(5).isAlive()).toBe(false);
  });
  it('Any dead cell with exactly three live neighbors becomes a live cell', () => {
    expect(Cell.create(CellsStatus.DEAD).regenerate(3).isAlive()).toBe(true);
  });

  it('cells with undefined initial state are not allowed', () => {
    expect(() => Cell.create(undefined as unknown as CellsStatus)).toThrow();
    expect(() => Cell.create(null as unknown as CellsStatus)).toThrow();
  });
});
