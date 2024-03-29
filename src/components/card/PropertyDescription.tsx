import Image from "next/image";

const PropertyRoomCard = ({
  title,
  imageUrl,
  status,
}: {
  title: string;
  imageUrl: string;
  status: string;
}) => {
  // const destinationRoute = title === "Menorca Hotel" ? "/menorca" : "/other";

  return (
    <div className="relative rounded-lg bg-white shadow-md">
      <Image
        src={imageUrl}
        alt={title}
        width={1000}
        height={100}
        className="rounded-t-lg object-cover"
      />
      {status === "Available" && (
        <span className="absolute right-0 top-0 rounded-tr-lg bg-green-500 px-2 py-1 text-white">
          Available
        </span>
      )}
      {status !== "Available" && (
        <span className="absolute right-0 top-0 rounded-tr-lg bg-red-500 px-2 py-1 text-white">
          Unavailable
        </span>
      )}
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">Status: {status}</p>
      </div>
    </div>
  );
};
export default PropertyRoomCard;
