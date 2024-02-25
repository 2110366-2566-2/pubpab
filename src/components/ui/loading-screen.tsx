import Image from "next/image";

export default function loadingscreen() {
  return (
    <div className="loading-screen flex w-full items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/Logo.svg"
          width={150}
          height={40}
          alt="logo"
          className="animate-bounce"
        />
        <div className="dot relative h-10 w-10 animate-bounce rounded-full bg-red-500">
          <div className="absolute inset-0 rounded-full"></div>
        </div>
        <div className="dot relative h-10 w-10 animate-bounce rounded-full bg-yellow-500">
          <div className="absolute inset-0 rounded-full"></div>
        </div>
        <div className="dot relative h-10 w-10 animate-bounce rounded-full bg-green-500">
          <div className="absolute inset-0 rounded-full"></div>
        </div>
        <div className="dot relative h-10 w-10 animate-bounce rounded-full bg-purple-500">
          <div className="absolute inset-0 rounded-full"></div>
        </div>
        <div className="dot relative h-10 w-10 animate-bounce rounded-full bg-blue-500">
          <div className="absolute inset-0 rounded-full "></div>
        </div>
      </div>
    </div>
  );
}
