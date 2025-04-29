type UseState = "WAIT" | "USE";
// WAIT : 대여 가능 상태
// USE : 대여 진행 상태

// 대여 상태 엔티티 객체
export default class Rental {
  // 대여 상태 관리 클래스
  private readonly rentalId: number;
  private readonly userId: string;
  private readonly device: string;
  private useState: UseState;
  // 하위 엔티티 객체
  private readonly rentalPeriod: RentalPeriod;

  static create(
    rentalId: number,
    userId: string,
    deviceId: string,
    startTime: Date,
    startCoordinate: number[]
  ): Rental {
    if (!userId) throw new Error("Invalid user ID");
    if (!deviceId) throw new Error("Invalid device ID");

    const rentalPeriod = new RentalPeriod(startTime, startCoordinate);

    return new Rental(rentalId, userId, deviceId, "USE", rentalPeriod);
  }

  private constructor(
    rentalId: number,
    userId: string,
    device: string,
    useState: UseState,
    rentalPeriod: RentalPeriod
  ) {
    this.rentalId = rentalId;
    this.userId = userId;
    this.device = device;
    this.useState = useState;
    this.rentalPeriod = rentalPeriod;
  }

  // --- 비즈니스 로직 메서드 ---

  // 반납 처리
  returnDevice(endTime: Date, endCoordinate: number[]): void {
    if (this.useState !== "USE") {
      throw new Error("Refund only allowed in USE state");
    }
    if (!this.rentalPeriod.isCompleted()) {
      throw new Error("Refund requires completed use details");
    }

    // 종료 정보 기입
    this.rentalPeriod.completePeriod(endTime, endCoordinate);

    this.useState = "WAIT"; // 상태 변경
  }

  // --- 상태 조회 메서드 ---
  get id(): number {
    return this.rentalId;
  }
  get currentUserId(): string {
    return this.userId;
  }
  get currentStatus(): UseState {
    return this.useState;
  }
  get currentDeviceId(): string {
    return this.device;
  }
  get period(): RentalPeriod {
    return this.rentalPeriod;
  }

  isOwnedBy(userId: string): boolean {
    return this.userId === userId;
  }
}
