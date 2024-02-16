import Image from "next/image";

const VerifyPropertyCard = ({
  title,
  imageUrl,
  status,
}: {
  title: string;
  imageUrl: string;
  status: string;
}) => {
  return (
    <div className="relative rounded-lg bg-white shadow-md">
      <Image
        src={imageUrl}
        alt={title}
        width={1000}
        height={100}
        className="rounded-t-lg object-cover"
      />
      {status === "Verified" && (
        <span className="absolute right-0 top-0 rounded-tr-lg bg-green-500 px-2 py-1 text-white">
          Verified
        </span>
      )}
      {status !== "Verified" && (
        <span className="absolute right-0 top-0 rounded-tr-lg bg-red-500 px-2 py-1 text-white">
          Unverified
        </span>
      )}
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">Status: {status}</p>
      </div>
    </div>
  );
};
export default VerifyPropertyCard;
