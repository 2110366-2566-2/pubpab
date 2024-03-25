import Image from "next/image";

import { Card } from "@/components/ui/card";
import Link from "next/link";

const Traveler_Notification = ({
  sentDate,
  sentTime,
  roomName,
  accommodationName,
  checkInDate,
  checkOutDate,
  totalAmount,
  noti_type,
  traveler_id,
  accommodation_id,
  reservation_id,
}: {
  sentDate: string;
  sentTime: string;
  roomName: string;
  accommodationName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  noti_type: string;
  traveler_id: string;
  accommodation_id: string;
  reservation_id: string;
}) => {
  // const goToReview = () => {
  //   router.back();
  // };
  // need link to page review

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
      {/* for page review on click use don't delete
      <Link
        href={{
          pathname: "/review",
          query: {
            traveler_id: traveler_id,
            accom_id: accommodation_id,
            reservation_id: reservation_id
          },
        }}
      /> */}
    </Card>
  );
};

export default Traveler_Notification;
