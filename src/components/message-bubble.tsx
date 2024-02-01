import { formatDistanceToNow } from "date-fns";

interface MessageBubbleProps {
  isUser?: boolean;
  text: string;
  sendAt: Date;
}

export function MessageBubble({ isUser, text, sendAt }: MessageBubbleProps) {
  const timeAgo = formatDistanceToNow(sendAt);

  return (
    <div className="w-full flex flex-col">
      <div
        className={`w-fit flex p-3 rounded-b-xl text-white font-semibold whitespace-normal ${
          isUser
            ? "self-end bg-logo md:ml-10 ml-2 rounded-l-xl"
            : "self-start bg-slate-800 md:mr-10 mr-2 rounded-r-xl"
        } break-all`}
      >
        {text}
      </div>
      <p
        className={`text-white/50 mb-5 select-none ${
          isUser ? "self-end mr-2" : "self-start ml-2"
        }`}
      >
        {timeAgo}
      </p>
    </div>
  );
}
