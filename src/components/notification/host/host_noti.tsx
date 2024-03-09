import Image from "next/image";

import { Card } from "@/components/ui/card";

const Host_Notification = ({
  firstName,
  lastName,
  sentDate,
  sentTime,
  roomName,
  accommodationName,
  checkInDate,
  checkOutDate,
  totalAmount,
  isReserved,
}: {
  firstName: string;
  lastName: string;
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
                    <strong>Guest Name: </strong> {firstName} {lastName} has
                    successfully reserved {roomName} at {accommodationName}
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
                      <strong>Guest Name: </strong> {firstName} {lastName} has
                      been cancelled the reservation for {roomName} at{" "}
                      {accommodationName}
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

export default Host_Notification;
