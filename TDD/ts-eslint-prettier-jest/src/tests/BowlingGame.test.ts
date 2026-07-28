import { BowlingGame } from '../core/BowlingGame';

describe('The Bowling Game', () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });

  it('should be able to create a bowling game', () => {
    expect(game).toBeInstanceOf(BowlingGame);
  });

  it('should be able to roll a ball', () => {
    game.roll(0);
    expect(game.rolls).toEqual([0]);
  });

  it('calculates the score for a given gutter game', () => {
    rollMany(20, 0);
    expect(game.calculateScore()).toBe(0);
  });

  it('calculates the score for a given game with all ones', () => {
    rollMany(20, 1);
    expect(game.calculateScore()).toBe(20);
  });

  it('calculates the score for a given game with a spare and extra ball', () => {
    rollSpare(); // spare
    game.roll(5); // extra ball
    rollMany(17, 0);
    expect(game.calculateTotalScore()).toBe(20);
  });

  it('calculates the score for a given game with a strike and two extra balls', () => {
    game.roll(10); // strike
    game.roll(2); // extra ball
    game.roll(3); // extra ball
    rollMany(16, 0);
    expect(game.calculateTotalScore()).toBe(20);
  });

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }

  function rollMany(times: number = 20, pins: number = 0): void {
    Array.from({ length: times }).forEach(() => game.roll(pins));
  }
});
