import PaymentStatusDTO from "../application/dto/PaymentStatusDTO";

// 다양한 라이브러리 대응하는 구현체를 만들기 위한 역할 정의
// findById : 인자 : userid 반환 Payment객체체
// save : 인자 userid, 역직렬화 데이터 반환 boolean
// update : 인자 userid, 역직렬화 데이터 반환 boolean
// TODO : 추후 save, update 또한 DTO 생성이 필요한 것으로 보임
export default interface PayementRepository {
  save(payment: Payment): Promise<void>;
  update(payment: Payment): Promise<void>;
  findById(userId: string): Promise<Payment | void>;
  findStatusById(userId: string): Promise<PaymentStatusDTO | void>;
}
