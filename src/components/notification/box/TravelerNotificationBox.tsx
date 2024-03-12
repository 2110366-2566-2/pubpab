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
  noti_type,
}: {
  sentDate: string;
  sentTime: string;
  roomName: string;
  accommodationName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  noti_type: string;
}) => {
  return (
    <Card className="w-full p-3">
      <div className="flex justify-between">
        <div>
          {noti_type === "Reservation" && (
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
          )}

          {noti_type === "Cancellation" && (
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

          {noti_type === "Reminder" && (
            <div className="flex justify-between">
              <div>
                <div>
                  <span className="text-[#004B64]">
                    <p className="text-xs">
                      {sentDate} {sentTime}
                    </p>
                    <div className="flex items-start">
                      <div>
                        <Image
                          src="/Reminder.svg"
                          width={30}
                          height={30}
                          alt="reserve"
                        />
                      </div>
                      <div className="ml-2">
                        <p>Reminder for reservation.</p>
                        <p>
                          {roomName} at {accommodationName}
                        </p>
                        <p>
                          <strong>Date: </strong> {checkInDate} - {checkOutDate}
                        </p>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Traveler_Notification;
