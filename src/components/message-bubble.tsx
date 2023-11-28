import { formatDistanceToNow } from "date-fns";

interface MessageBubbleProps {
  isUser?: boolean;
  text: string;
  sendAt: Date;
}

export function MessageBubble({ isUser, text, sendAt }: MessageBubbleProps) {
  const timeAgo = formatDistanceToNow(sendAt);
  return (
    <div className="w-full flex flex-col px-2">
      <div
        className={`w-fit flex p-3 rounded-xl text-white font-semibold ${
          isUser
            ? "self-end bg-logo md:ml-6 ml-2"
            : "self-start bg-slate-800 md:mr-6 mr-2"
        }`}
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
