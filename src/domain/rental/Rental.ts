import { RentalPersistenceData } from "../../infrastructure/mapper/RentalMapper";

type UseState = "WAIT" | "USE" | "RETURN" | "RENTAL";
// RENTAL 상태 : 대여 요청을 위한 유효성 검사
// RETURN 상태 : 반납을 위한 유효성 검사
// WAIT : 대여 가능 상태
// USE : 대여 진행 상태

type MethodState = "REJECTED" | "APPROVED";

// 대여 상태 엔티티 객체
// 시작 시간과 시작 좌표를 입력할 수 있다.
// 종료 시간과 종료 좌표를 입력할 수 있다.
export default class Rental {
  private readonly rentalId: number;
  private useState: UseState;
  private readonly detail: Detail;
  private readonly userId: string;
  private readonly device: Device;
  private readonly payMethod: MethodState;

  private constructor(
    rentalId: number,
    useState: UseState,
    userId: string,
    detail: Detail,
    device: Device,
    payMethod: MethodState
  ) {
    if (!rentalId || rentalId <= 0) throw new Error("Invalid rental ID");
    if (!userId) throw new Error("Invalid user ID");
    if (!detail || !device || !payMethod)
      throw new Error("All dependencies must be provided");
    this.rentalId = rentalId;
    this.useState = useState;
    this.userId = userId;
    this.detail = detail;
    this.device = device;
    this.payMethod = payMethod;
  }

  static create(data: RentalPersistenceData): Rental {
    const detail = new Detail(data.startTime, data.startCoordinate);
    const device = new Device(data.deviceId, data.authKey, data.bleKey);
    return new Rental(
      data.rentalId,
      data.UseState,
      data.userId,
      detail,
      device,
      "APPROVED" // 기본값, 실제로는 데이터에서 가져와야 함
    );
  }

  getDeviceInfo(): Device {
    return this.device;
  }

  getDetail(userId: string): Detail {
    if (userId !== this.userId) throw new Error("Invalid ID");

    return this.detail;
  }

  //반납 진행 메서드드
  // 사용자 상태 USE인 경우만 진행 가능
  // 종료 좌표가 입력되었는지 useComplate를 통해 확인
  // 이후 changeState 호출하여 상태 RETURN 변경
  setRefound(endTime: Date, endCoordinate: number[]): boolean {
    if (this.useState !== "USE") {
      throw new Error("Refund only allowed in USE state");
    }
    if (!this.detail.useCompleted()) {
      throw new Error("Refund requires completed use details");
    }

    // 종료 정보 기입
    this.detail.setEndDetail(endTime, endCoordinate);

    this.useState = "RETURN"; // 상태 변경
    return true;
  }

  // WAIT 인 경우 RENTAL로 상태 변경
  // WAIT RENTAL 상태일때만 진행 가능
  // PayMethod 검증 상태가 APPROVED인 경우에만 대여 진행 가능
  // 아닌 경우 false 반환
  setRental(): boolean {
    if (this.useState !== "WAIT" && this.useState !== "RENTAL") {
      return false;
    }
    if (this.payMethod !== "APPROVED") {
      return false;
    }
    this.useState = "RENTAL";
    return true;
  }

  // 대여 가능 여부 확인 메서드드
  checkUseState(id: string): UseState {
    if (this.userId !== id) {
      throw new Error("Invalid user ID");
    }
    return this.useState;
  }
}
