import { ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { MessageCard } from "./message-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function MessagesPanel() {
  return (
    <div className="bg-secondary/70 min-w-[192px] sm:w-[349px] ml-2 rounded-md shadow-lg flex flex-col">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4">
        <h1 className="flex items-start gap-2 font-semibold text-xl">
          Messages{" "}
          <ChevronDown className="cursor-pointer rounded-full hover:bg-accent transition-colors w-8 h-8 p-1" />
        </h1>
        <Button
          className="rounded-full p-1 w-9 h-9 bg-logo"
          variant={"outline"}
        >
          <Plus />
        </Button>
      </header>
      <div className="flex flex-col p-4 max-h-[90%] overflow-hidden">
        <div className="flex items-center gap-3 h-12 border-none bg-accent/30 px-4 rounded-md text-lg mt-2 mb-6">
          <Search />
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Search messages"
          />
        </div>
        <ScrollArea className="flex flex-col flex-1">
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
