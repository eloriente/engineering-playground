type Score = {
  totalScore: number;
  frameIndex: number;
};

export class BowlingGame {
  rolls: number[] = [];
  private readonly maxScorePerFrame = 10;

  roll(pins: number): void {
    this.rolls.push(pins);
  }

  calculateScore(): number {
    return this.rolls.reduce((total, pins) => total + pins, 0);
  }

  calculateTotalScore() {
    return this.calculateTotalScoreNew();
  }

  calculateTotalScoreNew() {
    type Score = {
      totalScore: number;
      frameIndex: number;
    };

    return this.frames().reduce(
      ({ totalScore, frameIndex }: Score) => {
        return this.calculateScorePerFrame({ totalScore, frameIndex });
      },
      { totalScore: 0, frameIndex: 0 }
    ).totalScore;
  }

  private calculateScorePerFrame({ totalScore, frameIndex }: Score) {
    if (this.isStrike(frameIndex)) {
      return {
        totalScore: totalScore + this.maxScorePerFrame + this.strikeBonus(frameIndex),
        frameIndex: frameIndex + 1,
      };
    }

    if (this.isSpare(frameIndex)) {
      return {
        totalScore: totalScore + this.maxScorePerFrame + this.spareBonus(frameIndex),
        frameIndex: frameIndex + 2,
      };
    }

    return {
      totalScore: totalScore + this.sumOfBalls(frameIndex),
      frameIndex: frameIndex + 2,
    };
  }

  private strikeBonus(frameIndex: number): number {
    return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
  }

  private spareBonus(frameIndex: number): number {
    return this.rolls[frameIndex + 2];
  }

  private isStrike(frameIndex: number): boolean {
    return this.rolls[frameIndex] == this.maxScorePerFrame;
  }

  private isSpare(frameIndex: number): boolean {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1] == this.maxScorePerFrame;
  }

  private sumOfBalls(frameIndex: number): number {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
  }

  frames(): number[] {
    const numberOfFrames: number = this.maxScorePerFrame;
    return Array.from({ length: numberOfFrames }).map((_, frameIndex: number) => frameIndex);
  }
}
