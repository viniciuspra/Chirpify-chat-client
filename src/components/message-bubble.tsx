import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { BoxSelect, Copy, TextSelect, Trash2 } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";
import "react-toastify/dist/ReactToastify.css";

interface MessageBubbleProps {
  isUser?: boolean;
  text: string;
  sendAt: Date;
}

export function MessageBubble({ isUser, text, sendAt }: MessageBubbleProps) {
  const timeAgo = new Date(sendAt);
  const formattedMinutes = timeAgo.getMinutes().toString().padStart(2, "0");
  const formattedHour = timeAgo.getHours().toString().padStart(2, "0");
  const formattedtime = `${formattedHour}:${formattedMinutes}`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Message copied to clipboard successfully.", toastOptions);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="mb-5 px-3 flex flex-col group">
        <div
          className={`w-fit flex p-1 rounded-b-xl relative text-white font-semibold whitespace-normal ${
            isUser
              ? "self-end bg-logo md:ml-8 ml-3 rounded-l-xl"
              : "self-start bg-slate-800 md:mr-8 mr-3 rounded-r-xl"
          } break-all transition-colors active:bg-background group-active:bg-background`}
        >
          <p className="p-2">{text}</p>
          <div className="min-w-fit flex items-end h-fit justify-end self-end">
            <span
              className={`text-white/50 px-2 text-xs font-medium select-none`}
            >
              {formattedtime}
            </span>
          </div>
          <ToastContainer />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          inset
          className="flex gap-3"
          onClick={handleCopyToClipboard}
        >
          <Copy size={20} /> Copy
          <ContextMenuShortcut>Ctrl + v</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled className="flex gap-3">
          <BoxSelect size={20} /> Select row
          <ContextMenuShortcut>Ctrl + l</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled className="flex gap-3">
          <TextSelect size={20} /> Select all
          <ContextMenuShortcut>Ctrl + a</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="flex gap-3">
          <Trash2 size={20} /> Delete for me
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
