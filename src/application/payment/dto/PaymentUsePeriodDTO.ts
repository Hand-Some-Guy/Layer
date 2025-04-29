export default class PaymentUsePeriodDTO {
  readonly useTimeInMinutes: number;
  readonly discount: number;
  readonly penalty: number;
  readonly amount: number;

  constructor(
    useMin: number,
    discount: number,
    penalty: number,
    amount: number
  ) {
    this.useTimeInMinutes = useMin;
    this.discount = discount;
    this.penalty = penalty;
    this.amount = amount;
  }
}
