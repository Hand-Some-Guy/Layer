import PaymentStatusDTO from "../../application/payment/dto/PaymentStatusDTO";

type PaymentPersistenceData = {
  paymentId: number;
  userId: string;
  payState: PayState;
  paymentMethodId: number;
  paymentMethodType: PaymentMethodType;
  useTimeInMinutes: number;
  baseRatePerMinute: number;
  discount: number;
  penalty: number;
};

export default class PaymentMapper {
  // 직렬화를 통한 Payment 객체 분해
  toPersistence(payment: Payment): PaymentPersistenceData {
    const rentalDetail = payment.getRentalDetail(payment["user"].getId());
    return {
      paymentId: payment.paymentId,
      userId: payment.user.getId(),
      payState: payment.payState,
      paymentMethodId: payment.paymentMethod.getId(),
      paymentMethodType: payment.paymentMethod.getType(),
      useTimeInMinutes: rentalDetail["useTimeInMinutes"],
      baseRatePerMinute: rentalDetail["baseRatePerMinute"],
      discount: rentalDetail["discount"],
      penalty: rentalDetail["penalty"],
    };
  }

  // 역직렬화를 통한 Payment 객체 복원원
  fromPersistence(data: PaymentPersistenceData): Payment {
    const user = new User(data.userId);
    const paymentMethod = new PaymentMethod(
      data.paymentMethodType,
      data.paymentMethodId
    );
    const rentalDetail = new RentalDetail(
      data.useTimeInMinutes,
      data.baseRatePerMinute,
      data.discount,
      data.penalty
    );
    const payment = Payment.create(
      data.paymentId,
      user,
      rentalDetail,
      paymentMethod
    );
    payment.setPayState(data.payState as any);
    return payment;
  }

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
}
