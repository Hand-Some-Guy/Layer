import PaymentStatusDTO from "./dto/PaymentStatusDTO";
import PaymentRepository from "../../repository/payment/PaymentRepository";

class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async getPaymentStatus(
    paymentId: number,
    userId: string
  ): Promise<PaymentStatusDTO> {
    // 캐시 확인
    // const cachedStatus = await getCachedStatus(paymentId);
    // if (cachedStatus) {
    //   return new PaymentStatusDTO(
    //     paymentId,
    //     JSON.parse(cachedStatus).payState,
    //     userId
    //   );
    // }

    // 리포지토리 조회
    const status = await this.paymentRepository.findStatusById(userId);
    if (!status) {
      throw new Error("Payment not found");
    }

    // 사용자 검증
    if (status.userId !== userId) {
      throw new Error("Invalid user ID");
    }

    // 캐시 저장
    // await setCachedStatus(
    //   paymentId,
    //   JSON.stringify({ payState: status.payState })
    // );
    return status;
  }
}
