type PayState = "PENDING" | "CONTINUE" | "REJECTED" | "APPROVED";
type PaymentMethodType = "CREDIT_CARD" | "KAKAO" | "NAVER";

// 애그리거크 루트: 결재
class Payment {
  readonly paymentId: number;
  readonly user: User;
  payState: PayState;
  readonly rentalDetail: RentalDetail;
  readonly paymentMethod: PaymentMethod;

  // 생성자 메서드
  private constructor(
    paymentId: number,
    user: User,
    rentalDetail: RentalDetail,
    paymentMethod: PaymentMethod
  ) {
    if (paymentId <= 0) throw new Error("Invalid payment ID");
    this.paymentId = paymentId;
    this.user = user;
    this.rentalDetail = rentalDetail;
    this.paymentMethod = paymentMethod;
    this.payState = "PENDING";
  }

  static create(
    paymentId: number,
    user: User,
    rentalDetail: RentalDetail,
    paymentMethod: PaymentMethod
  ): Payment {
    return new Payment(paymentId, user, rentalDetail, paymentMethod);
  }

  // 이용 상태 반환
  // 규칙 : 결재를 진행한 사용자와 현재 결재 내역이 일치하는지 검사
  checkState(userId: string): PayState {
    if (!this.validateUser(userId)) throw new Error("Invalid user ID");
    return this.payState;
  }

  // 결재 시스템이 인식 할 수 있도록 결재 상태 변경
  repay(): boolean {
    if (this.payState !== "REJECTED") throw new Error("Repaying failed");
    if (!this.paymentMethod) throw new Error("Payment method not implemented");
    if (!this.rentalDetail) throw new Error("RentalDetail not implemented");

    // 결재 상태 APPROVED 변경
    // 재결재 호출 완료 여부 반환
    return true;
  }

  // 결재 정보 반환 메서드
  // 규칙 : 결재를 진행한 사용자와 현재 결재 내역이 일치하는지 검사
  // 결재가 완료된 경우에 반환
  getRentalDetail(userId: string): RentalDetail {
    if (!this.validateUser(userId)) throw new Error("Invalid user ID");
    if (this.payState !== "APPROVED")
      throw new Error("Pay State is not APPROVED");

    return this.rentalDetail;
  }

  // 유틸리티 메서드
  // 사용자 유효성 검사
  private validateUser(userId: string): boolean | string {
    return userId && this.user.getId() === userId;
  }

  // 리포지토리에서 상태 업데이트를 위해 사용
  setPayState(state: PayState): void {
    this.payState = state;
  }

  getPaymentId(): number {
    return this.paymentId;
  }

  getPayState(): PayState {
    return this.payState;
  }
}
