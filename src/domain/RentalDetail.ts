// 이용 기록 정보
// 이용정보는 식별자를 통해 변하는 것이 아닌 불변성을 가진 밸류 객체로 선언
class RentalDetail {
  private readonly useTimeInMinutes: number;
  private readonly baseRatePerMinute: number;
  private readonly discount: number;
  private readonly penalty: number;

  constructor(
    useTime: number,
    baseRatePerMinute: number,
    discount: number,
    penalty: number
  ) {
    if (baseRatePerMinute < 0 || discount < 0 || penalty < 0) {
      throw new Error("Invalid policy values");
    }
    if (useTime <= 0) throw new Error("Invalid time values");
    this.useTimeInMinutes = useTime;
    this.baseRatePerMinute = baseRatePerMinute;
    this.discount = discount;
    this.penalty = penalty;
  }

  calculateFinalAmount(): number {
    const baseAmount = this.useTimeInMinutes * this.baseRatePerMinute;
    return baseAmount - this.discount + this.penalty;
  }

  // 역질렬화 기능 제공
  toPersistence() {}
}
