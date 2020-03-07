export default class Deposit {
  date: Date;
  amount: number;
  constructor(dateStr: string, amount: number) {
    this.date = new Date(dateStr);
    this.amount = amount;
  }
}
