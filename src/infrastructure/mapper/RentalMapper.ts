import Rental from "../../domain/rental/Rental";

type UseState = "WAIT" | "USE" | "RETURN" | "RENTAL";
type MethodState = "REJECTED" | "APPROVED";

export type RentalPersistenceData = {
  rentalId: number;
  userId: string;
  UseState: UseState;
  startTime: Date;
  startCoordinate: number[];
  endTime?: Date;
  endCoordinate?: number[];
  deviceId: string;
  authKey: string;
  bleKey: string;
  payMethod: MethodState;
};

class RentalMapper {
  // 직렬화를 통한 Rental 객체 분해
  static toPersistence(rental: Rental): RentalPersistenceData {
    const detail = rental["detail"]; // private 접근을 위해 타입 단언
    const device = rental["device"];
    const detailData = detail.toPersistence();
    const deviceData = device.toPersistence();

    return {
      rentalId: rental["rentalId"],
      userId: rental["userId"],
      UseState: rental["useState"],
      startTime: detailData.startTime,
      startCoordinate: detailData.startCoordinate,
      endTime: detailData.endTime,
      endCoordinate: detailData.endCoordinate,
      deviceId: deviceData.deviceId,
      authKey: deviceData.authKey,
      bleKey: deviceData.bleKey,
      payMethod: rental["payMethod"],
    };
  }

  // 역직렬화를 통한 Payment 객체 복원원
  static fromPersistence(data: RentalPersistenceData): Rental {
    return Rental.create(data);
  }

  // 직렬화를 통한 DTO 변환
  fromPaymentStatusDTO() {}
}
