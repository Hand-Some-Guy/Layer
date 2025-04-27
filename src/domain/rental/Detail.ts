// RentalDetail 엔티티 객체
// 이용 정보에 대한 상세 기록
// id 데이터베이스의 Auto incrment 값을 저장하여 대여 기록을 식별한다
class Detail {
  private readonly startTime: Date;
  private endTime?: Date;
  private readonly startCoordinate: number[];
  private endCoordinate?: number[];

  constructor(startTime: Date, startCoordinate: number[]) {
    if (!startTime || startTime.getTime() <= new Date().getTime())
      throw Error("Invalid startTime time");
    if (!startCoordinate) throw Error("Invalid Coordinate");

    this.startTime = startTime;
    this.startCoordinate = startCoordinate;
  }

  toPersistence(): {
    startTime: Date;
    startCoordinate: number[];
    endTime: Date | undefined;
    endCoordinate: number[] | undefined;
  } {
    return {
      startTime: this.startTime,
      startCoordinate: this.startCoordinate,
      endTime: this.endTime,
      endCoordinate: this.endCoordinate,
    };
  }

  // 반납 정보 디테일 획득 메서드
  // TODO : 타입 선언 필요
  getDetail() {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      startCoordinate: this.startCoordinate,
      endCoordinate: this.endCoordinate,
    };
  }

  // 이용 완료 상태인지 검사하는 메서드
  useCompleted(): boolean {
    return (
      this.endCoordinate != null &&
      this.startCoordinate != null &&
      true &&
      this.startTime != null &&
      this.endTime != null
    );
  }

  // 반납 좌표 설정
  setEndDetail(endTime: Date, endCoordinate: number[]) {
    // 간단한 반납 정보 입력 규칙
    // 시작 시간과 같거나 좌표값이 값은 경우 입력 배제
    if (this.startTime === endTime) throw Error("Invalid endTime time");
    if (this.startCoordinate === endCoordinate)
      throw Error("Invalid startCoordinate");

    this.endTime = endTime;
    this.endCoordinate = endCoordinate;
  }
}
