type PayState = "PENDING" | "CONTINUE" | "REJECTED" | "APPROVED";
type PaymentMethodType = "CREDIT_CARD" | "KAKAO" | "NAVER";

// 유저 정보 엔티티 객체
// null이 오면 비정상적인 객체로 인식
class User {
  // 유저 전화번호를 식별자로 사용
  // 식별자를 변경할 순 없다.
  private readonly userId: string;
  constructor(userId: string) {
    if (!userId) throw new Error("User ID is required");
    this.userId = userId;
  }

  // 유저 식별자 획득
  getId(): string {
    return this.userId;
  }
}

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
}



// 애그리거크 루트: 결재
class Payment {
  private readonly paymentId: number;
  private readonly user: User;
  private payState: PayState;
  private readonly rentalDetail: RentalDetail;
  private readonly paymentMethod: PaymentMethod;

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
}
