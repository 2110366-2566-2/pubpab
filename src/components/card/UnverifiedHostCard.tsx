import Image from "next/image";
//FOR ADMIN VERIFY
export default function UnverifiedHostCard({
  imageUrl,
  first_name,
  last_name,
}: {
  imageUrl: string;
  first_name: string;
  last_name: string;
}) {
  return (
    <div className="relative flex w-fit flex-col overflow-hidden rounded-lg text-left">
      <div className="absolute right-5 top-5">Verify / Not Verify</div>
      <Image src={imageUrl} width={500} height={500} alt="" />
      <div className="flex flex-col">
        <h1>
          Name: {first_name} {last_name}
        </h1>
      </div>
    </div>
  );
}
