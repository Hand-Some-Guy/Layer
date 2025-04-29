// RentalDetail 엔티티 객체
// 이용 정보에 대한 상세 기록
// id 데이터베이스의 Auto incrment 값을 저장하여 대여 기록을 식별한다
class RentalPeriod {
  private readonly startTime: Date;
  private readonly endTime: Date | null;
  private readonly startCoordinate: number[];
  private readonly endCoordinate: number[] | null;

  constructor(
    startTime: Date,
    startCoordinate: number[],
    endTime?: Date,
    endCoordinate?: number[]
  ) {
    if (!startTime || startTime.getTime() <= new Date().getTime())
      throw new Error("startTime must not null");
    if (!startCoordinate) throw new Error("startCoordinate must not null");

    this.startTime = startTime;
    this.startCoordinate = startCoordinate;
    this.endTime = endTime || null;
    this.endCoordinate = endCoordinate || null;
  }

  completePeriod(endTime: Date, endCoordinate: number[]): RentalPeriod {
    if (this.endTime || this.endCoordinate) {
      throw new Error("Rental period already completed.");
    }
    if (endTime <= this.startTime) {
      throw new Error("End time must be after start time.");
    }
    return new RentalPeriod(
      this.startTime,
      this.startCoordinate,
      endTime,
      endCoordinate
    );
  }

  isCompleted(): boolean {
    return !!this.endTime && !!this.endCoordinate;
  }
}
