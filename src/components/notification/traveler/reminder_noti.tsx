import Image from "next/image";

import { Card } from "@/components/ui/card";

const Reminder_Notification = ({
  sentDate,
  sentTime,
  roomName,
  accommodationName,
  checkInDate,
  checkOutDate,
}: {
  sentDate: string;
  sentTime: string;
  roomName: string;
  accommodationName: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
  return (
    <Card className="w-full p-3">
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
    </Card>
  );
};

export default Reminder_Notification;
