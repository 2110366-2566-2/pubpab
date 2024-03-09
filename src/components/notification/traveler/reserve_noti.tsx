import Image from "next/image";

import { Card } from "@/components/ui/card";

const Traveler_Notification = ({
  sentDate,
  sentTime,
  roomName,
  accommodationName,
  checkInDate,
  checkOutDate,
  totalAmount,
  isReserved,
}: {
  sentDate: string;
  sentTime: string;
  roomName: string;
  accommodationName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  isReserved: boolean;
}) => {
  return (
    <Card className="w-full p-3">
      <div className="flex justify-between">
        <div>
          {isReserved ? (
            <div>
              <p className="text-xs">
                {sentDate} {sentTime}
              </p>
              <div className="flex items-start">
                <div>
                  <Image
                    src="/Reserve.svg"
                    width={30}
                    height={30}
                    alt="reserve"
                  />
                </div>
                <div className="ml-2">
                  <p>
                    <strong>Status: </strong>Reservation for {roomName} at{" "}
                    {accommodationName} is successfully made.
                  </p>
                  <p>
                    <strong>Date: </strong> {checkInDate} - {checkOutDate}
                  </p>
                  <p>
                    <strong>Total Amount: </strong> {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-[#701414]">
                <p className="text-xs">
                  {sentDate} {sentTime}
                </p>
                <div className="flex items-start">
                  <div>
                    <Image
                      src="/Cancel.svg"
                      width={30}
                      height={30}
                      alt="reserve"
                    />
                  </div>
                  <div className="ml-2">
                    <p>
                      <strong>Status: </strong>Cancellation of the reservation
                      for {roomName} at {accommodationName} is successfully
                      made.
                    </p>
                    <p>
                      <strong>Date: </strong> {checkInDate} - {checkOutDate}
                    </p>
                    <p>
                      <strong>Total Amount: </strong> {totalAmount}
                    </p>
                  </div>
                </div>
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Traveler_Notification;
