import Image from "next/image";
//FOR ADMIN VERIFY
export default function PropertyAccomCard({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative flex w-fit flex-col overflow-hidden rounded-lg text-left">
      <div className="absolute right-5 top-5">Open / Closed</div>
      <Image src={imageUrl} width={500} height={500} alt="" />
      <div className="flex flex-col">
        <h1>Name </h1>
        <h2>Location</h2>
      </div>
    </div>
  );
}
