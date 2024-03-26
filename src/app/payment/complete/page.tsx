import Image from "next/image";

export default function CompletePayment() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold text-[#49B019]">
          Payment completed
        </h1>
        {/* <div className="flex w-full flex-col gap-4">
            
            </div> */}
        <div>
          {" "}
          <Image
            src="/green-check.svg"
            width={300}
            height={300}
            alt="payment completed"
          />
        </div>
      </div>
    </div>
  );
}
