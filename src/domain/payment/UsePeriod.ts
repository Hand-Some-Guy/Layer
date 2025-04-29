// 이용 기록 정보
// 이용정보는 식별자를 통해 변하는 것이 아닌 불변성을 가진 밸류 객체로 선언
class UsePeriod {
  private useTimeInMinutes: number;
  private baseRatePerMinute: number;
  private discount: number;
  private penalty: number;

  constructor(
    useTime: number,
    baseRatePerMinute: number,
    discount: number,
    penalty: number
  ) {
    if (!useTime || useTime <= 1) throw new Error("useTime not valide");
    if (!baseRatePerMinute || baseRatePerMinute <= 100)
      throw new Error("useTime not valide");
    if (!discount || discount <= 0) throw new Error("useTime not valide");
    if (!penalty || penalty <= 0) throw new Error("useTime not valide");

    this.useTimeInMinutes = useTime;
    this.baseRatePerMinute = baseRatePerMinute;
    this.discount = discount;
    this.penalty = penalty;
  }

  getUseTimeInMinutes(): number {
    return this.useTimeInMinutes;
  }

  getBaseRatePerMinute(): number {
    return this.baseRatePerMinute;
  }

  getDiscount(): number {
    return this.discount;
  }

  getPenalty(): number {
    return this.penalty;
  }

  calculateFinalAmount(): number {
    const baseAmount = this.useTimeInMinutes * this.baseRatePerMinute;
    return baseAmount - this.discount + this.penalty;
  }
}
