// USE : 자전거 이용중
// CONTINUE : PG 결재 요청 대기중
// REJECTED, APPROVED : PG 결재 상태
type PayState = "USE" | "CONTINUE" | "REJECTED" | "APPROVED";

// 애그리거크 루트: 결재
// TODO : 역할을 비대 부여하지 말 것
class Payment {
  private paymentId: number;
  private userId: string;
  private payState: PayState;
  // 하위 엔티티티
  private usePeriod: UsePeriod;

  // 생성자 메서드
  private constructor(
    paymentId: number,
    userId: string,
    usePeriod: UsePeriod,
    payState: PayState
  ) {
    if (paymentId <= 0) throw new Error("Invalid payment ID");
    this.paymentId = paymentId;
    this.userId = userId;
    this.usePeriod = usePeriod;
    this.payState = payState;
  }

  // Factory 패턴 대체 [전역 메서드]
  static create(
    paymentId: number,
    user: string,
    useTime: number,
    baseRatePerMinute: number,
    discount: number,
    penalty: number
  ): Payment {
    if (!paymentId) throw new Error("Id not valide");
    if (!user) throw new Error("user not valide");

    const usePeriod = new UsePeriod(
      useTime,
      baseRatePerMinute,
      discount,
      penalty
    );

    return new Payment(paymentId, user, usePeriod, "CONTINUE");
  }

  // --- 비즈니스 로직 메서드 ---
  // PG 처리 완료 시 상태 변경
  useComplite(PGState: string): void {
    if (PGState === "faile") {
      this.payState = "REJECTED";
      throw new Error();
    }

    this.payState = "APPROVED";
  }

  // --- 상태 조회 메서드 ---
  // 결재 정보 반환 메서드
  getUsePeriod(): UsePeriod {
    return this.usePeriod;
  }

  getPaymentId(): number {
    return this.paymentId;
  }

  getPayState(): PayState {
    return this.payState;
  }

  isOwnedBy(userId: string): boolean {
    return this.userId === userId;
  }
}
