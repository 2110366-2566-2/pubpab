import CheckoutComponent from "@/components/checkout/CheckoutComponent";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: {
    checkInDate: string;
    checkOutDate: string;
    room_id: string;
    host_id: string;
    price: string;
  };
}) {
  return (
    <CheckoutComponent
      checkInDate={searchParams.checkInDate}
      checkOutDate={searchParams.checkOutDate}
      room_id={searchParams.room_id}
      host_id={searchParams.host_id}
      price={searchParams.price}
    />
  );
}
