import { useEffect, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";

import { Check } from "lucide-react";
import { socket } from "@/services/socket";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/auth/slice";
import { Messages } from "./message-panel";
import { formatDistanceToNow } from "date-fns";

interface ContactCardProps {
  id?: string;
  username: string;
  imageUrl?: string;
  lastMessage?: Messages;
  onAddClick?: () => void;
  onClick?: () => void;
}

export function ContactCard({
  id,
  username,
  imageUrl,
  lastMessage,
  onAddClick,
  onClick,
}: ContactCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  const user = useAppSelector(selectAuth);
  const senderId = user?.id;

  const handleAddClick = () => {
    setIsAdded(true);
    toast.info(
      "Your request has been successfully sent to the user",
      toastOptions
    );
    socket.emit("sendRequest", senderId, id);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (lastMessage) {
      const sendAt = new Date(lastMessage?.createdAt);
      setTimeAgo(
        formatDistanceToNow(sendAt).replace(
          /about|minutes|hours|minute|hour/g,
          (match) => match[0]
        )
      );
    }
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      data-contact={onAddClick ? "true" : "false"}
      className="flex justify-between h-20 p-3 data-[contact=false]:cursor-pointer data-[contact=false]:hover:bg-slate-500/40 rounded-lg data-[contact=false]:active:scale-95 transition-all mb-4 data-[contact=false]:select-none"
    >
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14">
            <AvatarImage src={imageUrl} />
            <AvatarFallback className="uppercase">
              {username[0] + username[1]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{username}</h3>
            {lastMessage && (
              <p className="text-primary/50">
                {lastMessage.content.length > 10
                  ? `${lastMessage.content.slice(0, 10)}...`
                  : lastMessage.content}
              </p>
            )}
          </div>
        </div>

        <div>
          {lastMessage && <div className="text-primary/50">{timeAgo}</div>}

          {onAddClick && (
            <button
              type="button"
              onClick={handleAddClick}
              className="text-blue-500 hover:font-semibold transition-colors h-fit p-1 rounded-md my-auto"
            >
              {isAdded ? <Check /> : "Add"}
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
