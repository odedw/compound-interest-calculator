import Deposit from "./types/Deposit";

export default class Calculator {
  public calculateBalance(
    currentDate: Date,
    deposits: Deposit[],
    weeklyRate: number
  ): number {
    let sum = 0;
    deposits.forEach(d => {
      const weeksSince =
        (currentDate.getTime() - d.date.getTime()) / (1000 * 3600 * 24 * 7);
      sum += d.amount * Math.pow(1 + weeklyRate / 100, weeksSince);
    });
    return sum;
  }
}
