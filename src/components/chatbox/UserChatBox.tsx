import { Card } from "@/components/ui/card";

const FriendChatBox = ({
  messages,
  date,
  time,
}: {
  messages: string;
  date: string;
  time: string;
}) => {
  return (
    // <Card className="w-full p-3">
    //   <div className="flex justify-between">
    <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-[#004B64] p-4">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* <span className="text-sm font-semibold text-gray-900 dark:text-white"> Name</span> */}
        <span className="text-sm font-normal text-[#FFFFFF]">
          {date} {time}
        </span>
      </div>
      <p className="py-2.5 text-base font-normal text-[#FFFFFF]">{messages}</p>
      {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
    </div>
    //   </div>
    // </Card>
  );
};
