import PaymentStatusDTO from "../../application/payment/dto/PaymentStatusDTO";
import PaymentRepository from "./PaymentRepository";
import { Pool, RowDataPacket } from "mysql2/promise";

class MySqlPaymentRepository implements PaymentRepository {
  private readonly db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async save(payment: Payment): Promise<void> {
    const connection = this.db.getConnection();

    // 트랜젝션 시작
    connection.beginTransaction();
    try {
      //  query 문 실행
      // `` 쿼리문 입력 param ?
      // 배열에 순차적으로 PARAM 입력
      await connection.query("", []);

      //

      connection.commit();
    } catch (err) {
      connection.rollback();
      throw new Error("작업에 실패하였습니다");
    } finally {
      connection.release();
    }

    // 작업 내부에 여러 쿼리문이 필요 시 CQRS도입 고려 혹은 트랙젠셕을 통한 단일 작업 처리

    throw new Error("Method not implemented.");
  }

  update(payment: Payment): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // TODO : DB 스키마를 사용한 조회 방법 사용
  async findById(userId: string): Promise<Payment | null> {
    const connection = this.db.getConnection();

    // 트랜젝션 시작
    connection.beginTransaction();
    try {
      const [rows] = await connection.query<RowDataPacket[]>("", []);

      if (rows.length === 0) return null;

      return rows;
    } catch (err) {
      throw new Error("작업에 실패하였습니다");
    } finally {
      connection.release();
    }
  }

  // TODO : RowDataPacket 타입을 사용한 조회
  async findStatusById(userId: string): Promise<PaymentStatusDTO | void> {
    throw new Error("Method not implemented.");
  }
}
