// 결재 수단 밸류 객체
// 결재 진행이 가능한 대표 수단 확인
// 해당 값이 달라지면 다른 객체로 인식하여함
class PaymentMethod {
  // 결재 수단의 타입 값
  private readonly type: PaymentMethodType;
  // 결재 수단의 식별자
  private readonly id: number;

  constructor(type: PaymentMethodType, id: number) {
    if (!type || !id) throw new Error("Invalid payment method");
    this.type = type;
    this.id = id;
  }

  getType() {
    return this.type;
  }

  getId() {
    return this.id;
  }
}
