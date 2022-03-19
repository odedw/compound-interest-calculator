import Deposit from "./types/Deposit";

export default class Calculator {
  public calculateBalance(
    currentDate: Date,
    deposits: Deposit[],
    dailyRate: number
  ): number {
    deposits.sort((a, b) => a.date.getTime() - b.date.getTime());
    let sum = deposits[0].amount;
    for (let i = 1; i < deposits.length; i++) {
      const d = deposits[i];
      const prevDate = deposits[i - 1].date;
      const daysSince = Math.floor(
        (d.date.getTime() - prevDate.getTime()) / (1000 * 3600 * 24)
      );
      for (let index = 0; index < daysSince; index++) {
        sum += sum * dailyRate;
      }

      sum += d.amount;
    }
    const daysSince = Math.floor(
      (currentDate.getTime() - deposits[deposits.length - 1].date.getTime()) /
        (1000 * 3600 * 24)
    );
    for (let index = 0; index < daysSince; index++) {
      sum += sum * dailyRate;
    }

    return sum;
  }
}
