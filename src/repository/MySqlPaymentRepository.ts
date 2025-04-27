import PaymentStatusDTO from "../application/dto/PaymentStatusDTO";
import PaymentRepository from "./PaymentRepository";

class MySqlPaymentRepository implements PaymentRepository {
  save(payment: Payment): Promise<void> {
    // 커넥션 획득 로직 필요

    // Payment 객체 역직렬화 필요요

    // 작업 내부에 여러 쿼리문이 필요 시 CQRS도입 고려 혹은 트랙젠셕을 통한 단일 작업 처리

    throw new Error("Method not implemented.");
  }
  update(payment: Payment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(userId: string): Promise<Payment | void> {
    throw new Error("Method not implemented.");
  }
  findStatusById(userId: string): Promise<PaymentStatusDTO | void> {
    throw new Error("Method not implemented.");
  }
}
