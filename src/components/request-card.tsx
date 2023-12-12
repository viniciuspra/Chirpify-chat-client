import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { selectAuth } from "@/redux/auth/slice";
import { useAppSelector } from "@/redux/hooks";
import { socket } from "@/services/socket";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

type RequestStatus = "accepted" | "rejected" | "pending";

interface RequestCardProps {
  requestType: "sent" | "received";
  senderId?: string;
  username: string;
  imageUrl?: string;
  status?: RequestStatus;
}

export function RequestCard({
  senderId,
  username,
  imageUrl,
  requestType,
  status = "pending",
}: RequestCardProps) {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(status);

  const user = useAppSelector(selectAuth);

  const handleAcceptedRequest = () => {
    setRequestStatus("accepted");
  };

  const handleRejectedRequest = () => {
    setRequestStatus("rejected");
  };

  useEffect(() => {
    if (requestStatus === "accepted" && senderId) {
      socket.emit("respondFriendRequest", user?.id, senderId, requestStatus);
    }

    if (requestStatus === "rejected" && senderId) {
      socket.emit("respondFriendRequest", user?.id, senderId, requestStatus);
    }
  }, [requestStatus, user, senderId]);

  return (
    <div className="flex justify-between p-3 rounded-lg transition-all mb-2 select-none hover:bg-secondary">
      <div className="flex flex-1 items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="uppercase">
            {username && username.length >= 2 ? username[0] + username[1] : ""}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 w-full items-center justify-between">
          <h3 className="font-semibold text-base">{username}</h3>
          {requestType === "sent" && (
            <p
              data-status={requestStatus}
              className="text-sm data-[status=pending]:text-yellow-500 data-[status=rejected]:text-red-500 data-[status=accepted]:text-green-500 uppercase"
            >
              {requestStatus}
            </p>
          )}
        </div>
      </div>
      {requestType === "received" && (
        <div className="flex gap-4 items-center">
          <button
            type="button"
            className="hover:bg-blue-300/20 h-fit w-fit p-1 rounded-md transition-colors"
            onClick={handleAcceptedRequest}
          >
            <Check className="text-blue-500" />
          </button>
          <button
            type="button"
            className="hover:bg-red-300/20 h-fit w-fit p-1 rounded-md transition-colors"
            onClick={handleRejectedRequest}
          >
            <X className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}
