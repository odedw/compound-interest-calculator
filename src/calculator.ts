import data from "./data.json";
class Deposit {
  date: Date;
  amount: number;
  constructor(dateStr: string, amount: number) {
    this.date = new Date(dateStr);
    this.amount = amount;
  }
}
class Calculator {
  currentDate: Date = new Date();
  deposits: Deposit[];
  weeklyRate: number;
  constructor() {
    this.deposits = data.deposits.map(d => new Deposit(d.date, d.amount));
    this.weeklyRate = data.weeklyRate;
  }

  public get balance(): number {
    let sum = 0;
    this.deposits.forEach(d => {
      const weeksSince =
        (this.currentDate.getTime() - d.date.getTime()) /
        (1000 * 3600 * 24 * 7);
      sum += d.amount * Math.pow(1 + data.weeklyRate / 100, weeksSince);
    });
    return sum;
  }

  addDeposit(deposit: Deposit) {
    this.deposits.push(deposit);
  }
}

export default new Calculator();
