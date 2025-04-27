// 단순 데이터 교환 및 통신을 목적으로하는 DTO 객체
// 경제 상태 데이터를 주고 받는 것을 목적으로 한다.
export default class PaymentStatusDTO {
  readonly paymentId: number;
  readonly userId: string;
  readonly state: PayState;

  constructor(paymentId: number, state: PayState, userId: string) {
    this.paymentId = paymentId;
    this.userId = userId;
    this.state = state;
  }
}
