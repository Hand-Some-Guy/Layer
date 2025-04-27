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
