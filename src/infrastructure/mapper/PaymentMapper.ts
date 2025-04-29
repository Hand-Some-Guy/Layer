import PaymentStatusDTO from "../../application/payment/dto/PaymentStatusDTO";
import PaymentUsePeriodDTO from "../../application/payment/dto/PaymentUsePeriodDTO";

// type PaymentPersistenceData = {
//   paymentId: number;
//   userId: string;
//   payState: PayState;
//   paymentMethodId: number;
//   paymentMethodType: PaymentMethodType;
//   useTimeInMinutes: number;
//   baseRatePerMinute: number;
//   discount: number;
//   penalty: number;
// };

export default class PaymentMapper {
  // 직렬화를 통한 DTO 변환
  fromPaymentStatusDTO(data: {
    payment_id: number;
    pay_state: string;
    user_id: string;
  }) {
    return new PaymentStatusDTO(
      data.payment_id,
      data.pay_state as PayState,
      data.user_id
    );
  }

  fromPaymentUsePeriodDTO(data: {
    useTimeInMinutes: number;
    discount: number;
    penalty: number;
    amount: number;
  }) {
    return new PaymentUsePeriodDTO(
      data.useTimeInMinutes,
      data.discount,
      data.penalty,
      data.amount
    );
  }
}
