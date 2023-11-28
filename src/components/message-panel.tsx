import { Dot, MoreVertical } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { SendInput } from "./send-input";
import { MessageBubble } from "./message-bubble";

export function MessagePanel() {
  const sendAt = new Date();

  return (
    <div className="flex flex-col bg-secondary/70 flex-1 rounded-md shadow-lg border">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4">
        <div className="flex px-6 py-5 gap-5">
          <div>
            <img
              src="https://github.com/Viniciuspra.png"
              alt="profile"
              className="w-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col items-start font-semibold">
            <h1 className="text-xl">Vinicius Cascaes</h1>
            <p className="flex items-center justify-start text-sm">
              <Dot className="text-green-600 ml-[-9px]" /> Online
            </p>
          </div>
        </div>
        <div>
          <MoreVertical className="cursor-pointer hover:bg-accent transition-colors w-10 h-10 rounded-full p-2" />
        </div>
      </header>
      <div className="flex flex-1 flex-col">
        <ScrollArea className="p-6 h-[600px] w-full">
          <MessageBubble
            isUser
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, rem."
            sendAt={sendAt}
          />
          <MessageBubble
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, rem."
            sendAt={sendAt}
          />
          <MessageBubble
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, rem."
            sendAt={sendAt}
          />
          <MessageBubble
            isUser
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, rem."
            sendAt={sendAt}
          />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <SendInput />
    </div>
  );
}
