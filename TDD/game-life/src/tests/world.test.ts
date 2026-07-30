/*
Método de creación
Siguiente generación
Número de vecinos para una coordenada determinada:
[[DEAD]] en coordenadas (0, 0) => 0
[[ALIVE, DEAD]] en coordenadas (0, 1) => 1
[[DEAD, DEAD]] en coordenadas (0, 1) => 0 
[[ALIVE, DEAD, ALIVE] en coordenadas (0, 1) => 2
[[ALIVE, DEAD, ALIVE], [ALIVE, ALIVE, ALIVE]] en coordenadas (0, 1) => 5
[[ALIVE, ALIVE, ALIVE], [ALIVE, DEAD, ALIVE], [ALIVE, ALIVE, ALIVE]] en coordenadas (1, 1) => 8
*/

import { Cell } from '../core/Cell';
import { CellsStatus } from './cell.test';
import { World } from '../core/World';

describe('World', () => {
  it('creates a cell matrix for a given cell status', () => {
    let initialStatus = [
      [CellsStatus.DEAD, CellsStatus.DEAD],
      [CellsStatus.DEAD, CellsStatus.ALIVE],
    ];
    let world = World.createForm(initialStatus);
    expect(world.cellMatrix).toEqual([
      [Cell.create(CellsStatus.DEAD), Cell.create(CellsStatus.DEAD)],
      [Cell.create(CellsStatus.DEAD), Cell.create(CellsStatus.ALIVE)],
    ]);
  });

  it('gets alive neighborsfor a fiven coordinates', () => {
    expect(World.createForm([[CellsStatus.DEAD]]).getAliveNeighbors(0, 0)).toBe(0);
    expect(World.createForm([[CellsStatus.ALIVE, CellsStatus.DEAD]]).getAliveNeighbors(0, 1)).toBe(1);
    expect(World.createForm([[CellsStatus.DEAD, CellsStatus.DEAD]]).getAliveNeighbors(0, 1)).toBe(0);
    expect(World.createForm([[CellsStatus.ALIVE, CellsStatus.DEAD, CellsStatus.ALIVE]]).getAliveNeighbors(0, 1)).toBe(
      2
    );
    expect(
      World.createForm([
        [CellsStatus.ALIVE, CellsStatus.DEAD, CellsStatus.ALIVE],
        [CellsStatus.ALIVE, CellsStatus.ALIVE, CellsStatus.ALIVE],
      ]).getAliveNeighbors(0, 1)
    ).toBe(5);
    expect(
      World.createForm([
        [CellsStatus.ALIVE, CellsStatus.ALIVE, CellsStatus.ALIVE],
        [CellsStatus.ALIVE, CellsStatus.DEAD, CellsStatus.ALIVE],
        [CellsStatus.ALIVE, CellsStatus.ALIVE, CellsStatus.ALIVE],
      ]).getAliveNeighbors(1, 1)
    ).toBe(8);
  });

  it('generate the next state of the game', () => {
    const initialStatus = [
      [CellsStatus.DEAD, CellsStatus.ALIVE, CellsStatus.DEAD],
      [CellsStatus.DEAD, CellsStatus.ALIVE, CellsStatus.DEAD],
      [CellsStatus.DEAD, CellsStatus.ALIVE, CellsStatus.DEAD],
    ];

    const nextGeneration = World.createForm(initialStatus).nextGeneration();

    expect(nextGeneration.cellMatrix).toEqual([
      [Cell.create(CellsStatus.DEAD), Cell.create(CellsStatus.DEAD), Cell.create(CellsStatus.DEAD)],
      [Cell.create(CellsStatus.ALIVE), Cell.create(CellsStatus.ALIVE), Cell.create(CellsStatus.ALIVE)],
      [Cell.create(CellsStatus.DEAD), Cell.create(CellsStatus.DEAD), Cell.create(CellsStatus.DEAD)],
    ]);
  });
});
