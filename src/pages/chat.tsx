import { SideBar } from "@/components/side-bar";
import { ChatPanel } from "@/components/chat-panel";
import { MessagesPanel } from "@/components/messages-panel";

import Logo from "@/assets/logo.svg";

export function Chat() {
  return (
    <div className="h-screen flex p-4 overflow-hidden">
      <div className="flex flex-col bg-secondary/70 w-24 rounded-md items-center p-4 shadow-lg">
        <div className="w-16 cursor-pointer bg-primary/90 p-2 rounded-md flex items-center justify-center hover:bg-primary/80 transition-colors">
          <img src={Logo} alt="logo chirpify" className="w-10" />
        </div>
        <SideBar />
      </div>

      <main className="flex flex-1 space-x-2 overflow-hidden">
        <MessagesPanel />
        <ChatPanel />
      </main>
    </div>
  );
}
