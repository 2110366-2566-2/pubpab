import PaymentComplete from "@/components/checkout/paymentComplete"; // Correct import statement

export default function PaymentCompletePage({
  searchParams,
}: {
  searchParams: {
    checkInDate: string;
    checkOutDate: string;
    room_id: string;
    host_id: string;
    payment_id: string;
    checkout_id: string;
  };
}) {
  return (
    <PaymentComplete // Correct usage of PaymentComplete component
      checkInDate={searchParams.checkInDate}
      checkOutDate={searchParams.checkOutDate}
      payment_id={searchParams.payment_id}
      room_id={searchParams.room_id}
      host_id={searchParams.host_id}
      checkout_id={searchParams.checkout_id}
    />
  );
}
